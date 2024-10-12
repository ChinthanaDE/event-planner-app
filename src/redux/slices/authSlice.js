import {createSlice} from '@reduxjs/toolkit';
import {auth, firestore, storage} from '../../utils/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getErrorMessage} from '../../utils/firebaseError';

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
