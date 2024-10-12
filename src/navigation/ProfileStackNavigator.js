import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/home/profile/ProfileScreen';
import ProfileEditScreen from '../screens/home/profile/ProfileEditScreen';

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserProfile" component={ProfileScreen} />
      <Stack.Screen name="UserEditProfile" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
