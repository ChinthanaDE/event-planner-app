import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const BackButton = ({onPress, imageUrl}) => (
  <TouchableOpacity onPress={onPress} style={styles.backButtonContainer}>
    <Ionicons name="arrow-back" size={24} color="black" style={styles.backButtonImage} />
  </TouchableOpacity>
);

export const ProfileButton = ({imageUrl, onPress = null}) => {
  const Container = onPress ? TouchableOpacity : View;
  return (
    <Container style={styles.profileContainer} {...(onPress && {onPress})}>
     {imageUrl && <Image source={{uri: imageUrl}} style={styles.profileImage} />} 
    </Container>
  );
};

export const HeaderTitle = ({title}) => (
  <Text style={styles.headerTitle}>{title}</Text>
);

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
  },
  backButtonContainer: {
    width: 32,
    height: 32,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonImage: {
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
