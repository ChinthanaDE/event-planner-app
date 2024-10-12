import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomTextInput = ({
  label,
  value,
  icon,
  style,
  secureTextEntry,
  error,
  errorText,
  touched,
  onBlur,
  ...props
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = e => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const getBorderColor = () => {
    if (error && touched) return '#FF3B30';
    if (isFocused) return '#DA5E42';
    return 'rgba(68, 71, 73, 0.2)';
  };

  const getBackgroundColor = () => {
    if (error && touched) return '#FFE5E5';
    if (isFocused) return '#DA5E4214';
    return '#DA5E4214';
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {error && touched && <Text style={styles.asterisk}>*</Text>}
      </View>

      <View
        style={[
          styles.inputContainer,
          style,
          {
            backgroundColor: getBackgroundColor(),
            borderBottomColor: getBorderColor(),
          },
        ]}>
        {icon && <View style={styles.leftIcon}>{icon}</View>}
        <TextInput
          style={[styles.input, error && touched && styles.inputError]}
          value={value}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="#666"
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.rightIcon}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && touched && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={16} color="#FF3B30" />
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  asterisk: {
    color: '#FF3B30',
    marginLeft: 4,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1.5,
    borderRadius: 4,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#191C1E',
  },
  inputError: {
    color: '#191C1E',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    padding: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  errorText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#FF3B30',
  },
});

export default CustomTextInput;
