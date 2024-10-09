import { useState, useCallback } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

const useProfileImage = () => {
  const [imageUri, setImageUri] = useState(null);

  const selectImage = useCallback(() => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        console.log('Selected Image URI:', selectedImage.uri);
        setImageUri(selectedImage.uri);
      } else {
        console.log('Unexpected response from ImagePicker:', response);
      }
    });
  }, []);

  return {
    imageUri,
    selectImage,
  };
};

export default useProfileImage;