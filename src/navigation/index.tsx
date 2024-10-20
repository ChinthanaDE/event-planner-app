import React from 'react';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {RootState} from '../redux/store';
import {RootStackParamList} from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();
const navigationTheme: Theme = {
  dark: true,
  colors: {
    primary: '#e74c3c',
    background: '#191C1E',
    card: '#191C1E',
    text: '#ffffff',
    border: '#2c3e50',
    notification: '#e74c3c',
  },
};

const RootNavigation: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const hasCompletedRegistration = useSelector(
    (state: RootState) => state.auth.hasCompletedRegistration,
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isAuthenticated || !hasCompletedRegistration ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Main" component={DrawerNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
