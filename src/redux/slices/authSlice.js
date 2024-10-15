import {createSlice} from '@reduxjs/toolkit';
import {auth, firestore, storage} from '../../utils/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getErrorMessage} from '../../utils/firebaseError';

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
const initialState = {
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
      state.registrationStep = 2;
      state.isAuthenticated = true;
    },
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload.localUri;
      state.profileImageUrl = action.payload.downloadUrl;
      state.registrationStep = 3;
    },
    updatePersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
      state.hasCompletedRegistration = true;
      state.registrationStep = 0;
    },
    logout: state => {
      return initialState;
    },
    setRegistrationCompleted: (state, action) => {
      state.hasCompletedRegistration = true;
      state.registrationStep = 0;
      if (action.payload) {
        state.personalInfo = action.payload.personalInfo;
        state.profileImageUrl = action.payload.profileImageUrl;
      }
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

const handleError = (error, dispatch) => {
  const errorMessage = getErrorMessage(error);
  dispatch(setError(errorMessage));
  return false;
};
/**
 * Checks the current authentication state of the user.
 *
 * @returns {Function} - checks if the user is currently authenticated.
 */
export const checkAuthState = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    const user = auth().currentUser;

    if (user) {
      dispatch(setUser(user));

      const userDoc = await firestore().collection('users').doc(user.uid).get();

      if (userDoc.exists) {
        const userData = userDoc.data();

        if (userData.hasCompletedRegistration) {
          const personalInfo = {
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || user.email,
            phone: userData.phone || '',
            address: userData.address || '',
          };

          dispatch(
            setRegistrationCompleted({
              personalInfo,
              profileImageUrl: userData.profileImageUrl,
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
export const login = (email, password) => async dispatch => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );

    const user = userCredential.user;
    console.log('user', user);
    dispatch(setUser(user));

    const userDoc = await firestore().collection('users').doc(user.uid).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      console.log(
        'userData.hasCompletedRegistration',
        userData.hasCompletedRegistration,
      );
      if (userData.hasCompletedRegistration) {
        const personalInfo = {
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || user.email,
          phone: userData.phone || '',
          address: userData.address || '',
        };

        dispatch(
          setRegistrationCompleted({
            personalInfo,
            profileImageUrl: userData.profileImageUrl,
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
export const signup = (email, password) => async dispatch => {
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
export const logoutUser = () => async dispatch => {
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

export const submitProfileImage = imageUri => async (dispatch, getState) => {
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

    await user.updateProfile({
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
  personalInfo => async (dispatch, getState) => {
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

      await user.updateProfile({
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
export const updateProfile = newData => async (dispatch, getState) => {
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
      await user.updateProfile({
        displayName: `${newData.firstName} ${newData.lastName}`,
      });
    }

    dispatch(updatePersonalInfo(newData));
    return true;
  } catch (error) {
    return handleError(error, dispatch);
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUserProfile =
  (personalInfo, imageUri) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const {user} = getState().auth;
      if (!user) throw new Error('No authenticated user found');

      let profileData = {
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

        await user.updateProfile({
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

      await user.updateProfile({
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

export const selectUser = state => state.auth.user;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectIsLoading = state => state.auth.isLoading;
export const selectError = state => state.auth.error;
export const selectRegistrationStep = state => state.auth.registrationStep;
export const selectProfileImage = state => state.auth.profileImage;
export const selectProfileImageUrl = state => state.auth.profileImageUrl;
export const selectPersonalInfo = state => state.auth.personalInfo;
export const selectHasCompletedRegistration = state =>
  state.auth.hasCompletedRegistration;

export default authSlice.reducer;
