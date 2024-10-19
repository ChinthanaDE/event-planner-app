import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {auth, firestore, storage} from '../../utils/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getErrorMessage} from '../../utils/firebaseError';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AppDispatch, RootState} from '../store';
import {
  AuthState,
  PersonalInfo,
  ProfileImagePayload,
  RegistrationCompletedPayload,
} from '../../types/auth';

/**
 * Initial state for the authentication slice.
 *
 * @typedef {Object} AuthState
 * @property {Object|null} user - The currently authenticated user object or `null` if not authenticated.
 * @property {boolean} isAuthenticated - A flag indicating whether the user is authenticated (`true`) or not (`false`).
 * @property {boolean} isLoading - A flag representing whether an authentication operation (login/signup) is in progress (`true`).
 * @property {string|null} error - The error message from an authentication operation or `null` if no error occurred.
 * @property {number} registrationStep - A number representing the current step in the registration process (0: initial, 1: image upload, 2: completed).
 * @property {string|null} profileImage - The local URI of the user's profile image, or `null` if no image is set.
 * @property {string|null} profileImageUrl - The remote URL of the user's profile image, or `null` if not uploaded.
 * @property {Object|null} personalInfo - An object containing the user's personal information or `null` if not available.
 * @property {boolean} hasCompletedRegistration - A flag indicating whether the user has completed the registration process (`true`) or not (`false`).
 */
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  registrationStep: 0,
  profileImage: null,
  profileImageUrl: null,
  personalInfo: null,
  hasCompletedRegistration: false,
};

/**
 * Authentication slice manage authentication-related state and actions.
 *
 * @type {Slice<AuthState>}
 */

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseAuthTypes.User | null>) => {
      state.user = action.payload
        ? {
            uid: action.payload.uid,
            email: action.payload.email,
            displayName: action.payload.displayName,
            photoURL: action.payload.photoURL,
          }
        : null;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    signupSuccess: state => {
      state.registrationStep = 2;
      state.isAuthenticated = true;
    },
    updateProfileImage: (state, action: PayloadAction<ProfileImagePayload>) => {
      state.profileImage = action.payload.localUri;
      state.profileImageUrl = action.payload.downloadUrl;
      state.registrationStep = 3;
    },
    updatePersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
      state.hasCompletedRegistration = true;
      state.registrationStep = 0;
    },
    logout: state => {
      return initialState;
    },
    setRegistrationCompleted: (
      state,
      action: PayloadAction<RegistrationCompletedPayload>,
    ) => {
      state.hasCompletedRegistration = true;
      state.registrationStep = 0;
      state.personalInfo = action.payload.personalInfo;
      state.profileImageUrl = action.payload.profileImageUrl;
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
} = authSlice.actions;

const handleError = (error: any, dispatch: AppDispatch): boolean => {
  const errorMessage = getErrorMessage(error);
  dispatch(setError(errorMessage));
  return false;
};

/**
 * Checks the current authentication state of the user.
 *
 * @returns {Function} - checks if the user is currently authenticated.
 */

export const checkAuthState = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const user = auth().currentUser;

    if (user) {
      dispatch(setUser(user));

      const userDoc = await firestore().collection('users').doc(user.uid).get();

      if (userDoc.exists) {
        const userData = userDoc.data();

        if (userData?.hasCompletedRegistration) {
          const personalInfo: PersonalInfo = {
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || user.email || '',
            phone: userData.phone || '',
            address: userData.address || '',
          };

          dispatch(
            setRegistrationCompleted({
              personalInfo,
              profileImageUrl: userData.profileImageUrl || '',
            }),
          );
          await AsyncStorage.setItem('hasCompletedRegistration', 'true');
        }
      } else {
        await firestore().collection('users').doc(user.uid).set({
          email: user.email,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
          registrationStep: 2,
          hasCompletedRegistration: false,
        });
      }
      return true;
    } else {
      dispatch(setUser(null));
      await AsyncStorage.removeItem('hasCompletedRegistration');
      return false;
    }
  } catch (error) {
    return handleError(error, dispatch);
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Logs in a user with their email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Function} - perform the login process.
 */

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      dispatch(setUser(user));

      const userDoc = await firestore().collection('users').doc(user.uid).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        if (userData?.hasCompletedRegistration) {
          const personalInfo: PersonalInfo = {
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || user.email || '',
            phone: userData.phone || '',
            address: userData.address || '',
          };

          dispatch(
            setRegistrationCompleted({
              personalInfo,
              profileImageUrl: userData.profileImageUrl || '',
            }),
          );
          await AsyncStorage.setItem('hasCompletedRegistration', 'true');
        }
      }
      return true;
    } catch (error) {
      return handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

/**
 * Signs up a new user with email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Function} -  perform the signup process.
 */

export const signup =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      await firestore().collection('users').doc(user.uid).set({
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        registrationStep: 2,
        hasCompletedRegistration: false,
      });

      dispatch(setUser(user));
      dispatch(signupSuccess());
      return true;
    } catch (error) {
      return handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

/**
 * Logs out the currently authenticated user.
 *
 * @returns {Function} - perform the logout process.
 */

export const logoutUser = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    await auth().signOut();
    await AsyncStorage.removeItem('hasCompletedRegistration');
    dispatch(logout());
    return true;
  } catch (error) {
    return handleError(error, dispatch);
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Uploads the user's profile image and updates the state with the image URLs.
 *
 * This function uploads the image from a local URI to cloud storage and updates
 * the corresponding document in Firestore with the new profile image URL.
 *
 * @param {string} imageUri - The local URI of the image to be uploaded.
 * @returns {Function} - handle the image upload process.
 */

export const submitProfileImage =
  (imageUri: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoading(true));
    try {
      const {user} = getState().auth;
      if (!user) throw new Error('No authenticated user found');

      const response = await fetch(imageUri);
      const blob = await response.blob();
      const imagePath = `profile_images/${user.uid}/${Date.now()}.jpg`;
      const storageRef = storage().ref(imagePath);

      const userDoc = await firestore().collection('users').doc(user.uid).get();
      const oldImagePath = userDoc.data()?.profileImagePath;
      if (oldImagePath) {
        try {
          await storage().ref(oldImagePath).delete();
        } catch (error) {
          console.warn('Error deleting old profile image:', error);
        }
      }

      await storageRef.put(blob);
      const downloadUrl = await storageRef.getDownloadURL();

      await firestore().collection('users').doc(user.uid).update({
        profileImageUrl: downloadUrl,
        profileImagePath: imagePath,
        updatedAt: firestore.FieldValue.serverTimestamp(),
        registrationStep: 3,
      });

      await auth().currentUser?.updateProfile({
        photoURL: downloadUrl,
      });

      dispatch(
        updateProfileImage({
          localUri: imageUri,
          downloadUrl,
        }),
      );
      return true;
    } catch (error) {
      return handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

/**
 * Submits the user's personal information and updates it in Firestore and Redux state.
 *
 * This function updates the user's personal information such as name, phone, address,
 * and marks the registration process as completed.
 *
 * @param {Object} personalInfo - The user's personal information (e.g., firstName, lastName, phone, etc.).
 * @returns {Function} - handle the personal information submission process.
 */

export const submitPersonalInfo =
  (personalInfo: PersonalInfo) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoading(true));
    try {
      const {user} = getState().auth;
      if (!user) throw new Error('No authenticated user found');

      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          ...personalInfo,
          updatedAt: firestore.FieldValue.serverTimestamp(),
          hasCompletedRegistration: true,
        });

      await auth().currentUser?.updateProfile({
        displayName: `${personalInfo.firstName} ${personalInfo.lastName}`,
      });

      dispatch(updatePersonalInfo(personalInfo));
      await AsyncStorage.setItem('hasCompletedRegistration', 'true');
      return true;
    } catch (error) {
      return handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

/**
 * Updates both the user's personal information and profile image in Firestore and Redux state.
 *
 * This function handles the update of the user's personal information and uploads a new profile
 * image if provided. It ensures both fields are updated and synced across Firestore and Firebase Authentication.
 *
 * @param {Object} personalInfo - The user's personal information (e.g., firstName, lastName, etc.).
 * @param {string|null} imageUri - The local URI of the image to be uploaded, or `null` if no image change.
 * @returns {Function} - handle the combined profile update.
 */

export const updateProfile =
  (newData: Partial<PersonalInfo>) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoading(true));
    try {
      const {user} = getState().auth;
      if (!user) throw new Error('No authenticated user found');

      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          ...newData,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      if (newData.firstName && newData.lastName) {
        await auth().currentUser?.updateProfile({
          displayName: `${newData.firstName} ${newData.lastName}`,
        });
      }

      dispatch(updatePersonalInfo(newData as PersonalInfo));
      return true;
    } catch (error) {
      return handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateUserProfile =
  (personalInfo: PersonalInfo, imageUri?: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoading(true));
    try {
      const {user} = getState().auth;
      if (!user) throw new Error('No authenticated user found');

      let profileData: any = {
        ...personalInfo,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const imagePath = `profile_images/${user.uid}/${Date.now()}.jpg`;
        const storageRef = storage().ref(imagePath);

        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        const oldImagePath = userDoc.data()?.profileImagePath;
        if (oldImagePath) {
          try {
            await storage().ref(oldImagePath).delete();
          } catch (error) {
            console.warn('Error deleting old profile image:', error);
          }
        }

        await storageRef.put(blob);
        const downloadUrl = await storageRef.getDownloadURL();

        profileData.profileImageUrl = downloadUrl;
        profileData.profileImagePath = imagePath;

        await auth().currentUser?.updateProfile({
          photoURL: downloadUrl,
        });

        dispatch(
          updateProfileImage({
            localUri: imageUri,
            downloadUrl,
          }),
        );
      }

      await firestore().collection('users').doc(user.uid).update(profileData);

      await auth().currentUser?.updateProfile({
        displayName: `${personalInfo.firstName} ${personalInfo.lastName}`,
      });

      dispatch(updatePersonalInfo(personalInfo));
      return true;
    } catch (error) {
      return handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;
export const selectRegistrationStep = (state: RootState) =>
  state.auth.registrationStep;
export const selectProfileImage = (state: RootState) => state.auth.profileImage;
export const selectProfileImageUrl = (state: RootState) =>
  state.auth.profileImageUrl;
export const selectPersonalInfo = (state: RootState) => state.auth.personalInfo;
export const selectHasCompletedRegistration = (state: RootState) =>
  state.auth.hasCompletedRegistration;

export default authSlice.reducer;
