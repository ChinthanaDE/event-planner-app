import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {auth, messaging} from './src/utils/firebaseConfig';
import {useDispatch} from 'react-redux';
import RootNavigation from './src/navigation';
import store from './src/redux/store';
import {
  setUser,
  setLoading,
  checkAuthState,
} from './src/redux/slices/authSlice';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppDispatch} from './src/redux/store';

interface AuthStateManagerProps {
  children: React.ReactNode;
}

const AuthStateManager: React.FC<AuthStateManagerProps> = ({children}) => {
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
  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        messaging()
          .getToken()
          .then(token => {
            console.log('FCM Token:', token);
          });
      }
    };

    const subscribeToTopic = async () => {
      try {
        await messaging().subscribeToTopic('daily_notifications');
        console.log('Subscribed to daily_notifications topic');
      } catch (error) {
        console.error('Failed to subscribe to topic:', error);
      }
    };

    const setupNotificationListeners = () => {
      messaging().onMessage(async remoteMessage => {
        console.log(
          'Foreground message received:',
          JSON.stringify(remoteMessage),
        );
      });

      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log(
          'Background message received:',
          JSON.stringify(remoteMessage),
        );
      });
    };

    requestUserPermission();
    subscribeToTopic();
    setupNotificationListeners();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
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
