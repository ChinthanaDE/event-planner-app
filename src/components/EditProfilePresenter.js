import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import EditField from '../components/EditField';
import CustomHeader from '../components/CustomHeader';
import {BackButton, HeaderTitle} from '../components/HeaderComponents';
import ProfileImage from './ProfileImageComponent';

const EditProfilePresenter = ({
  profile,
  setProfile,
  handleSave,
  navigation,
  onImagePress,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        leftComponent={
          <BackButton
            onPress={() => navigation.goBack()}
          />
        }
        centerComponent={<HeaderTitle title="Profile" />}
      />
      <ScrollView style={styles.content}>
        <ProfileImage
          imageUrl={'https://via.placeholder.com/100'}
          size={120}
          showCamera={true}
          onImagePress={onImagePress}
        />
        <EditField
          label="First Name"
          value={profile.firstName}
          onChangeText={text => setProfile({...profile, firstName: text})}
        />
        <EditField
          label="Last Name"
          value={profile.lastName}
          onChangeText={text => setProfile({...profile, lastName: text})}
        />
        <EditField
          label="Email"
          value={profile.email}
          onChangeText={text => setProfile({...profile, email: text})}
        />
        <EditField
          label="Phone number"
          value={profile.phone}
          onChangeText={text => setProfile({...profile, phone: text})}
        />
        <EditField
          label="Mailing address"
          value={profile.mailingAddress}
          onChangeText={text => setProfile({...profile, mailingAddress: text})}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
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
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraButton: {
    position: 'absolute',
    bottom: '35%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cameraIcon: {
    fontSize: 24,
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
});

export default EditProfilePresenter;
