import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ImageUploadScreen from '../screens/auth/ImageUploadScreen';
import PersonalInfoScreen from '../screens/auth/PersonalInfoScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  const { hasCompletedRegistration } = useSelector(state => state.auth);
  const registrationStep = useSelector(state => state.auth.registrationStep);

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {registrationStep === 0 && (
        <AuthStack.Screen name="Login" component={LoginScreen} />
      )}
      {registrationStep === 1 && (
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      )}
      {!hasCompletedRegistration && (
        <>
          {registrationStep === 2 && (
            <AuthStack.Screen
              name="ImageUploadScreen"
              component={ImageUploadScreen}
            />
          )}
          {registrationStep === 3 && (
            <AuthStack.Screen
              name="PersonalInfo"
              component={PersonalInfoScreen}
            />
          )}
        </>
      )}
      {/* Fallback screen if no conditions are met */}
      {registrationStep < 0 || registrationStep > 3 && (
        <AuthStack.Screen name="Login" component={LoginScreen} />
      )}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;