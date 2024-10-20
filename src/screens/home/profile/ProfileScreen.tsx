import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import CustomHeader from '../../../components/CustomHeader';
import {ProfileButton, HeaderTitle} from '../../../components/HeaderComponents';
import ProfileImage from '../../../components/ProfileImageComponent';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import {checkAuthState} from '../../../redux/slices/authSlice';
import {AppDispatch, RootState} from '../../../redux/store';
import {ProfileStackNavigationProp} from '../../../types/navigation';
import {Profile, ProfileFormValues} from '../../../types/profile';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileStackNavigationProp<'UserProfile'>>();
  const dispatch = useDispatch<AppDispatch>();
  const {profileImageUrl, personalInfo, isLoading} = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  const handleEdit = () => {
    navigation.navigate('UserEditProfile');
  };

  const initialValues: ProfileFormValues = {
    firstName: personalInfo?.firstName || '',
    lastName: personalInfo?.lastName || '',
    email: personalInfo?.email || '',
    phone: personalInfo?.phone || '',
    address: personalInfo?.address || '',
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        leftComponent={
          <ProfileButton
            imageUrl={profileImageUrl || 'https://via.placeholder.com/100'}
          />
        }
        centerComponent={<HeaderTitle title="Profile" />}
      />
      <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.profileContainer}>
            <View style={styles.ProfileImage}>
              <ProfileImage
                imageUri={profileImageUrl || 'https://via.placeholder.com/100'}
                size={120}
              />
            </View>

            <Formik
              initialValues={initialValues}
              enableReinitialize
              onSubmit={values => console.log(values)}>
              {({values}) => (
                <View>
                  <CustomTextInput
                    label="First Name"
                    value={values.firstName}
                    editable={false}
                  />
                  <CustomTextInput
                    label="Last Name"
                    value={values.lastName}
                    editable={false}
                  />
                  <CustomTextInput
                    label="Email"
                    value={values.email}
                    editable={false}
                  />
                  <CustomTextInput
                    label="Phone number"
                    value={values.phone}
                    editable={false}
                  />
                  <CustomTextInput
                    label="Mailing address"
                    value={values.address}
                    editable={false}
                  />
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Edit"
            onPress={handleEdit}
            buttonStyle={styles.editButton}
            disabled={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 80,
  },
  ProfileImage: {
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  editButton: {
    width: '100%',
  },
});

export default ProfileScreen;
