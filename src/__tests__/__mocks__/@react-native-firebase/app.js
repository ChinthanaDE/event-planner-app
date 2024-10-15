const firebase = jest.createMockFromModule('@react-native-firebase/app');

firebase.initializeApp = jest.fn();

firebase.app = jest.fn(() => ({
  onNotification: jest.fn(),
  onNotificationDisplayed: jest.fn(),
}));

firebase.auth = jest.fn(() => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

firebase.firestore = jest.fn(() => ({
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      get: jest.fn(),
      set: jest.fn(),
      update: jest.fn(),
    })),
  })),
}));

firebase.storage = jest.fn(() => ({
  ref: jest.fn(() => ({
    put: jest.fn(),
    getDownloadURL: jest.fn(),
    delete: jest.fn(),
  })),
}));

firebase.analytics = jest.fn(() => ({
  logEvent: jest.fn(),
  setUserProperties: jest.fn(),
  setUserId: jest.fn(),
}));

firebase.messaging = jest.fn(() => ({
  getToken: jest.fn(),
  onMessage: jest.fn(),
  requestPermission: jest.fn(),
}));

module.exports = firebase;