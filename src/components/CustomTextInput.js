import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomTextInput = ({ label, value, style }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={[styles.fieldValue, style]}>
      <Text style={styles.fieldText}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
    fieldContainer: {
      width: '100%',
      marginBottom: 16,
    },
    fieldLabel: {
      fontSize: 16,
      color: '#666',
      marginBottom: 8,
    },
    fieldValue: {
      width: '100%',
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#F9F9F9',
      borderColor: '#E5E5E5',
      borderWidth: 1,
    },
    fieldText: {
      fontSize: 16,
      color: '#191C1E',
    },
  });
export default CustomTextInput;
