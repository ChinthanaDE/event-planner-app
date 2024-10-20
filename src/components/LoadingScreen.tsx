import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#e74c3c" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  message: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  message: {
    color: '#000',
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoadingScreen;
