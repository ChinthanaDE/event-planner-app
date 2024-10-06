import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventContainer from '../containers/EventContainer';
import ProfileContainer from '../containers/ProfileContainer';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={EventContainer} />
      <Tab.Screen name="Profile" component={ProfileContainer} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
