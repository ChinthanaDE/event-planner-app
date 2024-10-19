import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  type?: 'primary' | 'secondary';
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  type = 'primary',
  showLeftIcon,
  showRightIcon,
}) => (
  <TouchableOpacity
    style={[styles.button, styles[`${type}Button`], buttonStyle]}
    onPress={onPress}>
    {showLeftIcon && (
      <Icon
        name="arrow-back"
        size={20}
        color={styles[`${type}ButtonText`].color}
        style={styles.iconLeft}
      />
    )}
    <Text style={[styles.text, styles[`${type}ButtonText`], textStyle]}>
      {title}
    </Text>
    {showRightIcon && (
      <Icon
        name="arrow-forward"
        size={20}
        color={styles[`${type}ButtonText`].color}
        style={styles.iconRight}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#E97451',
  },
  secondaryButton: {
    backgroundColor: 'rgba(218, 94, 66, 0.08)',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButtonText: {
    color: '#000',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default CustomButton;
