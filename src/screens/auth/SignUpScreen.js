import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Formik} from 'formik';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const SignUpScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Welcome to your Portal</Text>
        </View>

        <Formik
          initialValues={{email: '', password: '', confirmPassword: ''}}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleSubmit, values}) => (
            <View>
              <CustomTextInput
                label="Email"
                icon={<EvilIcons name="envelope" size={24} color="gray" />}
                placeholder="Enter email"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <CustomTextInput
                label="Password"
                placeholder="Enter password"
                icon={<EvilIcons name="lock" size={24} color="gray" />}
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
              />
              <CustomTextInput
                label="Confirm Password"
                 placeholder="Retype Password "
                icon={<EvilIcons name="lock" size={24} color="gray" />}
                secureTextEntry
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
              />
              <CustomButton
                title="Sign Up"
                showRightIcon={true}
                buttonStyle={{width: '100%'}}
                onPress={handleSubmit}
              />
              <CustomButton
                title="Login"
                showRightIcon={true}
                buttonStyle={{width: '100%'}}
                onPress={() => navigation.navigate('Login')}
                type="secondary"
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
});

export default SignUpScreen;
