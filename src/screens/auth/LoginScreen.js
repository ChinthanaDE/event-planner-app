import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Welcome to your Portal</Text>
        </View>

        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleSubmit, values}) => (
            <View>
              <CustomTextInput
                label="Email"
                icon={<EvilIcons name="envelope" size={24} color="gray" />}
                placeholder="your.email@gmail.com"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <CustomTextInput
                label="Password"
                icon={<EvilIcons name="lock" size={24} color="gray" />}
                placeholder="Enter Password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
              />
              <TouchableOpacity
                style={styles.viewAllContainer}
                onPress={() => {
                  console.log('comming soon..');
                }}>
                <Text style={styles.restorePassword}>Restore password</Text>
                <Feather name="arrow-up-right" size={24} color="#Db2424" />
              </TouchableOpacity>

              <CustomButton
                title="Login"
                onPress={handleSubmit}
                buttonStyle={{width: '100%'}}
                showRightIcon={true}
              />
              <CustomButton
                title="Sign Up"
                onPress={() => navigation.navigate('SignUp')}
                buttonStyle={{width: '100%'}}
                showRightIcon={true}
              />
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 24,
  },
  restorePassword: {
    alignItems: 'center',
    color: '#E97451',
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
});

export default LoginScreen;
