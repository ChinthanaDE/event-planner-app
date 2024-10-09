import React from 'react';
import {View, Image, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from './CustomHeader';
import {ProfileButton, HeaderTitle} from './HeaderComponents';
import ProfileImage from './ProfileImageComponent';
import {Formik} from 'formik';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

const ProfilePresenter = ({userProfile, setUserProfile, handleUpdate}) => {
  // TODO :: setUserProfile and handleUpdate functinality
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate('UserEditProfile', {userProfile});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CustomHeader
          leftComponent={
            <ProfileButton imageUrl={'https://via.placeholder.com/100'} />
          }
          centerComponent={<HeaderTitle title="Profile" />}
        />

        <View style={styles.profileContainer}>
          <View style={styles.ProfileImage}>
          <ProfileImage imageUrl={'https://via.placeholder.com/100'} size={120} />
          </View>
          <Formik
          initialValues={{
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            email: userProfile.email,
            phone: userProfile.phone,
            address: userProfile.mailingAddress,
          }}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleSubmit, values}) => (
            <View>
              <CustomTextInput
                label="First Name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
              />
              <CustomTextInput
                label="Last Name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
              />
              <CustomTextInput
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <CustomTextInput
                label="Phone number"
                value={values.phone}
                onChangeText={handleChange('phone')}
              />
              <CustomTextInput
                label="Mailing address"
                value={values.address}
                onChangeText={handleChange('address')}
              />
              <View style={styles.buttonsContainer}>
                <CustomButton
                  title="Edit"
                  onPress={handleEdit}
                  buttonStyle={{ width: '100%' }} 
                />
              </View>
            </View>
          )}
        </Formik>
        </View>
    
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  fieldContainer: {
    width: '100%',
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  fieldValue: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
  },
  fieldText: {
    fontSize: 16,
    color: '#191C1E',
  },
  grayBg: {
    backgroundColor: '#F5F5F5',
  },
  pinkBg: {
    backgroundColor: '#FFF5F5',
  },
  editButton: {
    width: '100%',
    backgroundColor: '#E86C4F',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    position: 'absolute',
    bottom: 32, // TODO : stick the button in the bottom
    alignSelf: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#191C1E',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#191C1E',
  },
  ProfileImage:{
    alignItems: 'center'
  }
});

export default ProfilePresenter;
