import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomTextInput = ({ label, value, icon, style, secureTextEntry, ...props }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, style]}>
        {icon && <View style={styles.leftIcon}>{icon}</View>}
        <TextInput
          style={styles.input}
          value={value}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.rightIcon}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DA5E4214',
    paddingHorizontal: 12,
    borderBottomColor:'rgba(68, 71, 73, 0.2)',
    borderBottomWidth: 1.5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#191C1E',
  },
  leftIcon: {
    marginRight: 8, 
  },
  rightIcon: {
    padding: 8,
  },
});

export default CustomTextInput;
