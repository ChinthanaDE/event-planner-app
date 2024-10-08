import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomButton = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  type = 'primary',
}) => (
  <TouchableOpacity
    style={[styles.button, styles[`${type}Button`], buttonStyle]}
    onPress={onPress}>
    <Text style={[styles.text, styles[`${type}ButtonText`], textStyle]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#E97451',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E97451',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButtonText: {
    color: '#E97451',
  },
});

export default CustomButton;
