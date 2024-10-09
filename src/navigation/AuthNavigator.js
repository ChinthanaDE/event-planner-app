import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ImageUploadScreen from '../screens/auth/ImageUploadScreen';
import PersonalInfoScreen from '../screens/auth/PersonalInfoScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="ImageUploadScreen" component={ImageUploadScreen} />
      <AuthStack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;