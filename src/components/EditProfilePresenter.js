import React from 'react';
import {SafeAreaView, View, ScrollView, StyleSheet} from 'react-native';
import CustomTextInput from '../components/CustomTextInput'; // Update this line
import CustomHeader from '../components/CustomHeader';
import {BackButton, HeaderTitle} from '../components/HeaderComponents';
import ProfileImage from './ProfileImageComponent';
import CustomButton from '../components/CustomButton';
import useProfileImage from '../hooks/useProfileImage';

const EditProfilePresenter = ({
  profile,
  setProfile,
  handleSave,
  navigation,
  onImagePress,
}) => {
  const {imageUri, selectImage} = useProfileImage();
  console.log('Image URI in ImageUploadScreen:', imageUri);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        leftComponent={<BackButton onPress={() => navigation.goBack()} />}
        centerComponent={<HeaderTitle title="Profile" />}
      />
      <ScrollView style={styles.content}>
        <View style={styles.ProfileImage}>
        <ProfileImage
          imageUri={imageUri}
          size={120}
          showCamera={true}
          onImagePress={selectImage}
        />
        </View>

        <CustomTextInput
          label="First Name"
          value={profile.firstName}
          onChangeText={text => setProfile({...profile, firstName: text})}
        />
        <CustomTextInput
          label="Last Name"
          value={profile.lastName}
          onChangeText={text => setProfile({...profile, lastName: text})}
        />
        <CustomTextInput
          label="Email"
          value={profile.email}
          onChangeText={text => setProfile({...profile, email: text})}
        />
        <CustomTextInput
          label="Phone number"
          value={profile.phone}
          onChangeText={text => setProfile({...profile, phone: text})}
        />
        <CustomTextInput
          label="Mailing address"
          value={profile.mailingAddress}
          onChangeText={text => setProfile({...profile, mailingAddress: text})}
        />

        <View style={styles.buttonsContainer}>
          <CustomButton
            title="Save"
            onPress={handleSave}
            buttonStyle={{width: '100%'}}
          />
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
  content: {
    padding: 16,
  },
  saveButton: {
    backgroundColor: '#E86C4F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  ProfileImage: {
    alignItems: 'center',
  },
});

export default EditProfilePresenter;
