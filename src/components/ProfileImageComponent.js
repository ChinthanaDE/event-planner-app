import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileImage = ({
  imageUrl,
  size = 120,
  showCamera = false,
  onImagePress,
  style,
  imageStyle,
}) => {
  const containerSize = size;
  const borderRadius = size / 2;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={onImagePress}
        disabled={!onImagePress}
        style={[
          styles.imageContainer,
          {
            width: containerSize,
            height: containerSize,
            borderRadius: borderRadius,
          },
        ]}>
        <Image
          source={imageUrl ? {uri: imageUrl} : ''}
          style={[
            styles.profileImage,
            {
              width: containerSize,
              height: containerSize,
              borderRadius: borderRadius,
            },
            imageStyle,
          ]}
        />

        {showCamera && (
          <View style={styles.cameraButtonContainer}>
            <View style={styles.cameraButton}>
            <Ionicons name="camera-outline" size={24} color="white" style={styles.cameraIcon} />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  cameraButtonContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  cameraButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 24,
  },
  uploadHintContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  dimensionsContainer: {
    marginTop: 8,
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dimensionsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ProfileImage;
