import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {AuthStackParamList} from '../types/navigation';

import LoginScreen from '../screens/auth/logging/LoginScreen';
import SignUpScreen from '../screens/auth/logging/SignUpScreen';
import ImageUploadScreen from '../screens/auth/onboarding/ImageUploadScreen';
import PersonalInfoScreen from '../screens/auth/onboarding/PersonalInfoScreen';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  const registrationStep = useSelector(
    (state: RootState) => state.auth.registrationStep,
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const getScreens = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      );
    } else {
      return (
        <>
          <Stack.Screen name="ImageUpload" component={ImageUploadScreen} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        </>
      );
    }
  };

  const getInitialRouteName = (): keyof AuthStackParamList => {
    switch (registrationStep) {
      case 1:
        return 'SignUp';
      case 2:
        return 'ImageUpload';
      case 3:
        return 'PersonalInfo';
      default:
        return 'Login';
    }
  };

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
    cardStyle: {backgroundColor: '#191C1E'},
  };

  return (
    <Stack.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={screenOptions}>
      {getScreens()}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
