import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileContainer from '../containers/ProfileContainer';
import EditProfileContainer from '../containers/EditProfileContainer';

const ProfileStack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="UserProfile"
        component={ProfileContainer}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="UserEditProfile"
        component={EditProfileContainer}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
