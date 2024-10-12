import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { auth } from './src/utils/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import RootNavigation from './src/navigation';
import store from './src/redux/store';
import { setUser, setLoading, checkAuthState } from './src/redux/slices/authSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppDispatch } from './src/redux/store';

interface AuthStateManagerProps {
  children: React.ReactNode;
}

const AuthStateManager: React.FC<AuthStateManagerProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initializeAuth = async () => {
      await dispatch(checkAuthState());
      
      const unsubscribe = auth().onAuthStateChanged(async user => {
        if (user) {
          await dispatch(checkAuthState());
        } else {
          dispatch(setUser(null));
          dispatch(setLoading(false));
        }
      });

      return unsubscribe;
    };

    initializeAuth();
  }, [dispatch]);

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" />
          <AuthStateManager>
            <RootNavigation />
          </AuthStateManager>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;