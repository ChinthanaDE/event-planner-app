import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Platform,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomHeader from '../../../components/CustomHeader';
import {BackButton, HeaderTitle} from '../../../components/HeaderComponents';
import ProfileImage from '../../../components/ProfileImageComponent';
import CustomButton from '../../../components/CustomButton';
import {
  updateUserProfile,
  clearError,
  setError,
} from '../../../redux/slices/authSlice';
import useProfileImage from '../../../hooks/useProfileImage';
import {POST_LIST_TITLE} from '../../../constants/constants';

const PersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  address: Yup.string().required('Address is required'),
});

const ProfileEditScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {imageUri, selectImage} = useProfileImage();
  const {profileImageUrl, personalInfo, isLoading, error} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSave = async values => {
    if (imageUri) {
      try {
        const success = await dispatch(updateUserProfile(values, imageUri));
        if (success) {
          navigation.goBack();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(setError('Please select an image first.'));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        leftComponent={<BackButton onPress={() => navigation.goBack()} />}
        centerComponent={<HeaderTitle title={POST_LIST_TITLE} />}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#Db2424" />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <Formik
            initialValues={{
              firstName: personalInfo?.firstName || '',
              lastName: personalInfo?.lastName || '',
              email: personalInfo?.email || '',
              phone: personalInfo?.phone || '',
              address: personalInfo?.address || '',
            }}
            validationSchema={PersonalInfoSchema}
            onSubmit={handleSave}>
            {({handleChange, handleSubmit, values, errors, touched}) => (
              <>
                <ScrollView style={styles.content}>
                  <View style={styles.ProfileImage}>
                    <ProfileImage
                      imageUri={imageUri || profileImageUrl}
                      size={120}
                      showCamera={true}
                      onImagePress={selectImage}
                    />
                  </View>
                  {error && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{error}</Text>
                    </View>
                  )}
                  <CustomTextInput
                    label="First Name"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    error={errors.firstName}
                    errorText={errors.firstName}
                    touched={touched.firstName}
                  />
                  <CustomTextInput
                    label="Last Name"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    error={errors.lastName}
                    errorText={errors.lastName}
                    touched={touched.lastName}
                  />
                  <CustomTextInput
                    label="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    error={errors.email}
                    errorText={errors.email}
                    touched={touched.email}
                  />
                  <CustomTextInput
                    label="Phone number"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    error={errors.phone}
                    errorText={errors.phone}
                    touched={touched.phone}
                  />
                  <CustomTextInput
                    label="Mailing address"
                    value={values.address}
                    onChangeText={handleChange('address')}
                    error={errors.address}
                    errorText={errors.address}
                    touched={touched.address}
                  />
                  <View style={styles.bottomSpacing} />
                </ScrollView>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title="Save"
                    onPress={handleSubmit}
                    buttonStyle={styles.saveButton}
                    disabled={isLoading}
                  />
                </View>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  ProfileImage: {
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  saveButton: {
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorContainer: {
    backgroundColor: '#FFE8E8',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ProfileEditScreen;
