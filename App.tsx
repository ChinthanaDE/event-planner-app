import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './src/redux/store';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const AppNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const registrationStep = useSelector((state: RootState) => state.auth.registrationStep);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <DrawerNavigator />
      ) : (
        <AuthNavigator registrationStep={registrationStep} /> //Todo: resolve the issue 
      )}
    </NavigationContainer>
  );
};

export default App;

