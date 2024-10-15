import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@react-native-firebase/auth', () => {
  return jest.requireActual('@react-native-firebase/app').auth;
});

jest.mock('@react-native-firebase/firestore', () => {
  return jest.requireActual('@react-native-firebase/app').firestore;
});

jest.mock('@react-native-firebase/storage', () => {
  return jest.requireActual('@react-native-firebase/app').storage;
});

jest.mock('@react-native-firebase/analytics', () => {
  return jest.requireActual('@react-native-firebase/app').analytics;
});

jest.mock('@react-native-firebase/messaging', () => {
  return jest.requireActual('@react-native-firebase/app').messaging;
});

// Mock NativeEventEmitter
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');