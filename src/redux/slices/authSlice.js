import {createSlice} from '@reduxjs/toolkit';
import {auth} from '../../utils/firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registrationStep: 0, // 0: Login, 1: SignUp, 2: ImageUpload, 3: PersonalInfo
  profileImage: null,
  personalInfo: null,
  hasCompletedRegistration: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    signupSuccess: state => {
      state.registrationStep = 2; // Move directly to ImageUpload after signup
    },
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
      state.registrationStep = 3; // Move to PersonalInfo
    },
    updatePersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
      state.hasCompletedRegistration = true;
      AsyncStorage.setItem('hasCompletedRegistration', 'true');
    },
    logout: state => {
      // Clear all state but maintain the structure
      Object.keys(initialState).forEach(key => {
        state[key] = initialState[key];
      });
      AsyncStorage.removeItem('hasCompletedRegistration');
    },
    setRegistrationCompleted: state => {
      state.hasCompletedRegistration = true;
    },
    resetRegistrationStep: state => {
      state.registrationStep = 0;
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  clearError,
  signupSuccess,
  updateProfileImage,
  updatePersonalInfo,
  logout,
  setRegistrationCompleted,
  resetRegistrationStep,
} = authSlice.actions;

// Thunks for Firebase authentication
export const login = (email, password) => async dispatch => {
  dispatch(setLoading(true));
  dispatch(clearError()); // Clear any existing errors
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    dispatch(setUser(userCredential.user));
    // Check if user has completed registration previously
    const completed = await AsyncStorage.getItem('hasCompletedRegistration');
    if (completed === 'true') {
      dispatch(setRegistrationCompleted());
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const signup = (email, password) => async dispatch => {
  dispatch(setLoading(true));
  dispatch(clearError()); // Clear any existing errors
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    dispatch(setUser(userCredential.user));
    dispatch(signupSuccess()); // Move to ImageUpload step
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    await signOut(auth);
    await AsyncStorage.removeItem('hasCompletedRegistration');
    dispatch(logout());
    dispatch(resetRegistrationStep()); // Ensure registration step is reset
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const checkRegistrationCompletion = () => async dispatch => {
  try {
    const completed = await AsyncStorage.getItem('hasCompletedRegistration');
    if (completed === 'true') {
      dispatch(setRegistrationCompleted());
    }
  } catch (error) {
    console.error('Error checking registration completion:', error);
  }
};

// Initialize auth state from storage
export const initializeAuthState = () => async dispatch => {
  try {
    const completed = await AsyncStorage.getItem('hasCompletedRegistration');
    if (completed === 'true') {
      dispatch(setRegistrationCompleted());
    }
  } catch (error) {
    console.error('Error initializing auth state:', error);
  }
};

// Selectors
export const selectUser = state => state.auth.user;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectIsLoading = state => state.auth.isLoading;
export const selectError = state => state.auth.error;
export const selectRegistrationStep = state => state.auth.registrationStep;
export const selectProfileImage = state => state.auth.profileImage;
export const selectPersonalInfo = state => state.auth.personalInfo;
export const selectHasCompletedRegistration = state =>
  state.auth.hasCompletedRegistration;

export default authSlice.reducer;

