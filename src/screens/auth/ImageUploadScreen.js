import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import ProfileImage from '../../components/ProfileImageComponent';
import useProfileImage from '../../hooks/useProfileImage';

const ImageUploadScreen = ({ navigation }) => {
  const { imageUri, selectImage } = useProfileImage();
  console.log("Image URI in ImageUploadScreen:", imageUri);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          You are logged in for the first time and can upload a profile photo
        </Text>

        <ProfileImage
          imageUri={imageUri}
          size={120}
          showCamera={true}
          onImagePress={selectImage}
        />

        <CustomButton
          title="Next"
          showRightIcon={true}
          buttonStyle={{ width: '100%' }}
          onPress={() => navigation.navigate('PersonalInfo')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default ImageUploadScreen;