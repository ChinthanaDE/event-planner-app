import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomButton from '../../../components/CustomButton';
import ProfileImage from '../../../components/ProfileImageComponent';
import useProfileImage from '../../../hooks/useProfileImage';
import {
  submitProfileImage,
  setError,
  clearError,
} from '../../../redux/slices/authSlice';
import {WELCOME_TITLE, IMAGE_UPLOAD_SUB} from '../../../constants/constants';
import {AppDispatch, RootState} from '../../../redux/store';
import {AuthStackParamList} from '../../../types/navigation';

type ImageUploadScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'ImageUpload'
>;

interface ImageUploadScreenProps {
  navigation: ImageUploadScreenNavigationProp;
}

const ImageUploadScreen: React.FC<ImageUploadScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {imageUri, selectImage} = useProfileImage();
  const {isLoading, error} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleNext = async () => {
    if (imageUri) {
      dispatch(clearError());
      await dispatch(submitProfileImage(imageUri));
      navigation.navigate('PersonalInfo');
    } else {
      dispatch(setError('Please select an image first.'));
    }
  };

  const handleImagePress = () => {
    selectImage();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.topContent}>
          <Text style={styles.title}>{WELCOME_TITLE}</Text>
          <Text style={styles.subtitle}>{IMAGE_UPLOAD_SUB}</Text>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          <ProfileImage
            imageUri={imageUri}
            size={120}
            showCamera={true}
            onImagePress={handleImagePress}
          />
        </View>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color="#Db2424"
              testID="loading-indicator"
            />
          </View>
        )}

        <View style={styles.bottomContent}>
          <CustomButton
            title="Next"
            showRightIcon={true}
            buttonStyle={styles.button}
            onPress={handleNext}
            disabled={isLoading || !imageUri}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  topContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContent: {
    width: '100%',
    paddingBottom: 16,
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
  button: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: '#FFE8E8',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  loadingContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
});

export default ImageUploadScreen;
