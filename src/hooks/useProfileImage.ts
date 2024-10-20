import {useState, useCallback} from 'react';
import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';

interface UseProfileImageResult {
  imageUri: string | null;
  selectImage: () => void;
}

const useProfileImage = (): UseProfileImageResult => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const selectImage = useCallback(() => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage: Asset = response.assets[0];
        console.log('Selected Image URI:', selectedImage.uri);
        if (selectedImage.uri) {
          setImageUri(selectedImage.uri);
        }
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
