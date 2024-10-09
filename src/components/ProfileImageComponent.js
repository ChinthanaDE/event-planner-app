import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileImage = ({ imageUri, size = 120, showCamera = false, onImagePress }) => {
  const containerSize = size;
  const borderRadius = size / 2;

  return (
    <TouchableOpacity
      onPress={onImagePress}
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: borderRadius,
        },
      ]}
    >
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[
            styles.profileImage,
            {
              width: containerSize,
              height: containerSize,
              borderRadius: borderRadius,
            },
          ]}
        />
      ) : (
        <View style={[styles.placeholderContainer, { backgroundColor: '#F5F5F5' }]} />
      )}

      {showCamera && (
        <View style={styles.cameraButtonContainer}>
          <View style={styles.cameraButton}>
            <Ionicons name="camera-outline" size={24} color="white" />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 24,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
  },
  cameraButtonContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  cameraButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileImage;