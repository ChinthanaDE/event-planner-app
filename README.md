This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# Event Planner App - React Native with Firebase

This README guides you through setting up a React Native project integrated with Firebase, including Authentication, Firestore, and Storage.

## Prerequisites

- Node.js (latest stable version)
- npm or Yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

## Project Setup

1. Create a new React Native project:
   ```
   npx react-native init EventPlannerApp
   cd EventPlannerApp
   ```

2. Install necessary dependencies:
   ```
   npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/storage
   ```

## Firebase Console Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).

2. Click "Add project" and follow the steps to create a new Firebase project.

3. Once your project is created, click "Add app" and choose the iOS and Android platforms.

4. Follow the setup instructions for each platform:
   - For iOS: Download the `GoogleService-Info.plist` file.
   - For Android: Download the `google-services.json` file.

5. Place these files in your React Native project:
   - iOS: `/ios/EventPlannerApp/GoogleService-Info.plist`
   - Android: `/android/app/google-services.json`

## iOS Setup

1. In your `ios/Podfile`, add the following lines:
   ```ruby
   pod 'Firebase/Core', '~> 8.0.0'
   pod 'Firebase/Auth', '~> 8.0.0'
   pod 'Firebase/Firestore', '~> 8.0.0'
   pod 'Firebase/Storage', '~> 8.0.0'
   ```

2. Install pods:
   ```
   cd ios && pod install && cd ..
   ```

## Android Setup

1. In your `android/build.gradle`, add to buildscript and allprojects:
   ```gradle
   buildscript {
     dependencies {
       classpath 'com.google.gms:google-services:4.3.10'
     }
   }
   ```

2. In your `android/app/build.gradle`, add:
   ```gradle
   apply plugin: 'com.google.gms.google-services'
   ```

## Firebase Configuration

Create a file `src/firebaseConfig.js`:

```javascript
import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const firebaseConfig = {
  // Your web app's Firebase configuration
};

const app = initializeApp(firebaseConfig);

export { auth, firestore, storage };
export default app;
```

Replace the `firebaseConfig` object with your actual Firebase configuration from the Firebase Console.

## Usage Examples

### Authentication

```javascript
import { auth } from './src/firebaseConfig';

// Sign Up
auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => console.log('User account created & signed in!'));

// Sign In
auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => console.log('User signed in!'));
```

### Firestore

```javascript
import { firestore } from './src/firebaseConfig';

// Add a document
firestore()
  .collection('Users')
  .add({
    name: 'John Doe',
    age: 30,
  })
  .then(() => console.log('User added!'));

// Read documents
firestore()
  .collection('Users')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  });
```

### Storage

```javascript
import { storage } from './src/firebaseConfig';

// Upload file
const reference = storage().ref('black-t-shirt-sm.png');
await reference.putFile(pathToFile);

// Download URL
const url = await storage()
  .ref('black-t-shirt-sm.png')
  .getDownloadURL();
```

## Security Rules

Remember to set up security rules in the Firebase Console for Firestore and Storage to secure your data.

## Environment Variables

For added security, consider using environment variables to store your Firebase config. You can use a package like `react-native-dotenv` for this purpose.

## Running Your App

- iOS: `npx react-native run-ios`
- Android: `npx react-native run-android`

## Troubleshooting

- If you encounter build errors, ensure all dependencies are correctly installed and linked.
- For iOS, try cleaning the build folder: `cd ios && rm -rf build && cd ..`
- For Android, try cleaning the gradle build: `cd android && ./gradlew clean && cd ..`


# Event Planner App - Firebase Functions

This repository contains the Firebase Cloud Functions for the Event Planner App. These functions handle backend operations, potentially including sending notifications and managing messaging campaigns.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or later recommended)
- npm (comes with Node.js)
- Firebase CLI (`npm install -g firebase-tools`)

## Setup

1. Clone this repository:
   ```
   git clone <your-repo-url>
   cd EventPlannerApp
   ```

2. Initialize Firebase in your project:
   ```
   firebase init
   ```
   - Select "Functions" when prompted for features to set up.
   - Choose "Use an existing project" and select your Firebase project (e.g., "eventapp-ef571 (EventApp)").
   - Select JavaScript as the language for Cloud Functions.
   - Choose whether to use ESLint (recommended for code quality).
   - Choose whether to install dependencies now.

3. Navigate to the functions directory:
   ```
   cd functions
   ```

4. Install dependencies if you haven't already:
   ```
   npm install
   ```

## Implementing Functions

1. Open `functions/index.js` in your code editor.

2. Implement your Cloud Functions. For example:
   ```javascript
   const functions = require('firebase-functions');
   const admin = require('firebase-admin');
   const moment = require("moment-timezone");
   admin.initializeApp();

   exports.sendNotification = functions.https.onCall((data, context) => {
     // Implement notification logic here
   });
   ```

## Local Development

1. To serve functions locally for testing:
   ```
   firebase emulators:start --only functions
   ```

2. To run linting (if ESLint is set up):
   ```
   npm run lint
   ```

## Deployment

To deploy your functions to Firebase:
```
firebase deploy --only functions
```

## Troubleshooting

- If you encounter permission issues, ensure you're logged in:
  ```
  firebase login
  ```
- For deployment issues, check your project's billing status and ensure you're on the Blaze plan for outbound network requests.

## Additional Resources

- [Firebase Cloud Functions Documentation](https://firebase.google.com/docs/functions)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

For any other issues or questions, please open an issue in this repository.