# Event Planner App

## Overview

Event Planner application built using React Native with TypeScript. It integrates Firebase for authentication, Firestore for real-time database storage, Firebase Cloud Messaging for push notifications, Firebase Cloud Storage, and Firebase Cloud Functions. The app allows users to log in, view events, interact with organizers, and edit profiles, all while managing the app state with Redux Toolkit.

[![React Native](https://img.shields.io/badge/React%20Native-0.71.8-blue.svg)](https://reactnative.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-9.22.1-orange.svg)](https://firebase.google.com/)

## Features

- User Authentication (Sign up, Login, Logout)
- Event Home Page with image slider and event details
- List of event organizers
- Horizontal image list with descriptions
- Posts and comments viewing
- User Profile management
- Drawer navigation with logout functionality
- Firebase integration for user management and push notifications

## Tech Stack

Event Planner uses a number of open source projects to work properly:

- [React Native](https://reactnative.dev/) - A framework for building native apps using React
- [Firebase](https://firebase.google.com/) - Google's mobile platform for app development
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management library
- [React Navigation](https://reactnavigation.org/) - Routing and navigation for React Native apps
- [Axios](https://axios-http.com/) - Promise based HTTP client for the browser and node.js

## Installation

## Prerequisites

- Node.js (latest stable version)
- npm or Yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)


Event Planner requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd event-planner-app
npm install
npx react-native run-android  # For Android
npx react-native run-ios      # For iOS
```
## Firebase Setup

To set up Firebase for this project, follow these steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on "Create a project" or "Add project".
3. Name your project "EventPlannerApp".
4. Enable Google Analytics for the project if desired.
5. After project creation, click on "Continue".
6. In the project dashboard, click on the gear icon next to "Project Overview" and select "Project settings".
7. Scroll down to "Your apps" section and click on the platform you're developing for (iOS or Android).
8. Follow the setup instructions provided by Firebase for your chosen platform.
9. Make sure to download and add the `google-services.json` (for Android) or `GoogleService-Info.plist` (for iOS) to your project.

After setting up Firebase, you'll need to enable the services you plan to use:

1. In the Firebase Console, go to "Build" in the left sidebar.
2. Enable Authentication, Cloud Firestore, and Cloud Messaging as needed for your app.

Remember to add the Firebase configuration to your app. You can find the configuration in the Firebase Console under Project settings > Your apps > SDK setup and configuration.




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

To run this project, you will need to add the following environment variables to your .env file:

```
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

## Running Your App

- iOS: `npx react-native run-ios`
- Android: `npx react-native run-android`

## Troubleshooting

- If you encounter build errors, ensure all dependencies are correctly installed and linked.
- For iOS, try cleaning the build folder: `cd ios && rm -rf build && cd ..`
- For Android, try cleaning the gradle build: `cd android && ./gradlew clean && cd ..`


#  Firebase Functions

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
   
  ```sh
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const moment = require("moment-timezone");

admin.initializeApp();

exports.sendDailyNotifications = functions.pubsub
    .schedule("0 8,12,17 * * *")
    .timeZone("Asia/Kolkata")
    .onRun(async (context) => {
      const messages = [
        {
          title: "Good Morning!",
          body: "Let's get this day started with Event Planner App",
        },
        {
          title: "Good Afternoon!",
          body: "Let's log in to Event Planner App",
        },
        {
          title: "Evening Reminder",
          body: "Let's read about Event Planner App",
        },
      ];

      // Get the current hour in IST
      const currentHour = moment().tz("Asia/Kolkata").hour();
      let messageIndex;

      if (currentHour === 8) {
        messageIndex = 0; // Good Morning
      } else if (currentHour === 12) {
        messageIndex = 1; // Good Afternoon
      } else if (currentHour === 17) {
        messageIndex = 2; // Evening Reminder
      } else {
        console.log("No message to send at this hour.");
        return null; // Exit if not one of the specified hours
      }

      const message = {
        notification: messages[messageIndex],
        topic: "daily_notifications",
      };

      try {
        const response = await admin.messaging().send(message);
        console.log("Successfully sent message:", response);
        return null;
      } catch (error) {
        console.log("Error sending message:", error);
        return null;
      }
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


## Project Structure

```
event-planner-app/
├── src/
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   ├── redux/
│   ├── services/
│   ├── utils/
│   └── App.js
├── __tests__/
├── android/
├── ios/
├── .env
├── package.json
└── README.md
```

## Running Tests

To run tests, run the following command:

```sh
npm run test
```

## API Reference

The app uses the following APIs:

- https://jsonplaceholder.typicode.com/photos
- https://jsonplaceholder.typicode.com/users
- https://jsonplaceholder.typicode.com/posts
- https://jsonplaceholder.typicode.com/comments

## Read More....

| README | LINK |
| ------ | ------ |
| CLI | [React Native Community CLI](https://github.com/react-native-community/cli) |
| GitHub | [Project Planing](https://github.com/users/ChinthanaDE/projects/3/views/1?filterQuery=)|
| Google Drive | [Hosted SDK]( https://drive.google.com/drive/folders/1xF4mkMlgxeaEQF6Ewx5brw_TozSzfjme?usp=sharing)|
| Best practice  | [Repository Naming](https://github.com/GoldenbergLab/naming-and-documentation-conventions) |
| React Debugger  | [React-native Doctor ](https://reactnative.dev/blog/2019/11/18/react-native-doctor) |

## License
MIT
Created By Chinthana De silva 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chinthana-desilva/) 



For any other issues or questions, please open an issue in this repository.
