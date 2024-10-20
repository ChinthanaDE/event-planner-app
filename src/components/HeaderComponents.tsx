import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface BackButtonProps {
  onPress: () => void;
  imageUrl?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({onPress, imageUrl}) => (
  <TouchableOpacity onPress={onPress} style={styles.backButtonContainer}>
    <Ionicons name="arrow-back" size={24} color="black" />
  </TouchableOpacity>
);

interface ProfileButtonProps {
  imageUrl?: string;
  onPress?: () => void;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  imageUrl,
  onPress = null,
}) => {
  const Container = onPress ? TouchableOpacity : View;
  return (
    <Container style={styles.profileContainer} {...(onPress && {onPress})}>
      {imageUrl && (
        <Image source={{uri: imageUrl}} style={styles.profileImage} />
      )}
    </Container>
  );
};

interface HeaderTitleProps {
  title: string;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({title}) => (
  <Text style={styles.headerTitle}>{title}</Text>
);

interface Styles {
  backButton: ViewStyle;
  backButtonContainer: ViewStyle;
  profileContainer: ViewStyle;
  profileImage: ImageStyle;
  headerTitle: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  backButton: {
    padding: 8,
  },
  backButtonContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
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
