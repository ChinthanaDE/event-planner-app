import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EventContainer from '../containers/EventContainer';
import ProfileStackNavigator from './ProfileStackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'grid-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e74c3c',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {
          paddingVertical: 5,
          height: 60,
          backgroundColor: '#191C1E',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={EventContainer}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
