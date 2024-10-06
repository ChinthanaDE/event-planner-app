import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import EventContainer from '../containers/EventContainer';
import ProfileContainer from '../containers/ProfileContainer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Events">
        <Drawer.Screen name="Events" component={EventContainer} />
        <Drawer.Screen name="Profile" component={ProfileContainer} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
