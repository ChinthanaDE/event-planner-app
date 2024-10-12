// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { useSelector } from 'react-redux';

// import LoginScreen from '../screens/auth/logging/LoginScreen';
// import SignUpScreen from '../screens/auth/logging/SignUpScreen';
// import ImageUploadScreen from '../screens/auth/onboarding/ImageUploadScreen';
// import PersonalInfoScreen from '../screens/auth/onboarding/PersonalInfoScreen';

// const Stack = createStackNavigator();

// const AuthNavigator = () => {
//   const registrationStep = useSelector(state => state.auth.registrationStep);
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

//   const getScreens = () => {
//     if (!isAuthenticated) {
//       return (
//         <>
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="SignUp" component={SignUpScreen} />
//         </>
//       );
//     } else {
//       return (
//         <>
//           <Stack.Screen name="ImageUpload" component={ImageUploadScreen} />
//           <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
//         </>
//       );
//     }
//   };

//   const getInitialRouteName = () => {
//     switch (registrationStep) {
//       case 1:
//         return 'SignUp';
//       case 2:
//         return 'ImageUpload';
//       case 3:
//         return 'PersonalInfo';
//       default:
//         return 'Login';
//     }
//   };

//   return (
//     <Stack.Navigator
//       initialRouteName={getInitialRouteName()}
//       screenOptions={{
//         headerShown: false,
//         cardStyle: { backgroundColor: '#191C1E' },
//       }}>
//       {getScreens()}
//     </Stack.Navigator>
//   );
// };

// export default AuthNavigator;
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import LoginScreen from '../screens/auth/logging/LoginScreen';
import SignUpScreen from '../screens/auth/logging/SignUpScreen';
import ImageUploadScreen from '../screens/auth/onboarding/ImageUploadScreen';
import PersonalInfoScreen from '../screens/auth/onboarding/PersonalInfoScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const registrationStep = useSelector(state => state.auth.registrationStep);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const getScreens = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      );
    } else {
      return (
        <>
          <Stack.Screen name="ImageUpload" component={ImageUploadScreen} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        </>
      );
    }
  };

  const getInitialRouteName = () => {
    switch (registrationStep) {
      case 1:
        return 'SignUp';
      case 2:
        return 'ImageUpload';
      case 3:
        return 'PersonalInfo';
      default:
        return 'Login';
    }
  };

  return (
    <Stack.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#191C1E' },
      }}>
      {getScreens()}
    </Stack.Navigator>
  );
};

export default AuthNavigator;