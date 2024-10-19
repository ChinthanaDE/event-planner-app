import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/home/profile/ProfileScreen';
import ProfileEditScreen from '../screens/home/profile/ProfileEditScreen';
import {ProfileStackParamList} from '../types/navigation';

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserProfile" component={ProfileScreen} />
      <Stack.Screen name="UserEditProfile" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
