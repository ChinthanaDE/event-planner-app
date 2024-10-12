import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import {login, clearError} from '../../../redux/slices/authSlice';
import {
  WELCOME_TITLE,
  WELCOME_SUBTITLE,
  RESTORE_PASSWORD,
} from '../../../constants/constants';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading, error} = useSelector(state => state.auth);

  const handleLogin = values => {
    dispatch(login(values.email, values.password));
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#Db2424" />
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>{WELCOME_TITLE}</Text>
            <Text style={styles.subtitle}>{WELCOME_SUBTITLE}</Text>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </View>

          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}>
            {({handleChange, handleSubmit, values, errors, touched}) => (
              <View>
                <CustomTextInput
                  label="Email"
                  icon={<EvilIcons name="envelope" size={24} color="gray" />}
                  placeholder="Enter Email"
                  value={values.email}
                  error={errors.email}
                  errorText={errors.email}
                  touched={touched.email}
                  onChangeText={handleChange('email')}
                />
                <CustomTextInput
                  label="Password"
                  icon={<EvilIcons name="lock" size={24} color="gray" />}
                  placeholder="Enter Password"
                  secureTextEntry
                  value={values.password}
                  error={errors.password}
                  errorText={errors.password}
                  touched={touched.password}
                  onChangeText={handleChange('password')}
                />
                <TouchableOpacity style={styles.viewAllContainer}>
                  <Text style={styles.restorePassword}>{RESTORE_PASSWORD}</Text>
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
                  onPress={() => {
                    dispatch(clearError());
                    navigation.navigate('SignUp');
                  }}
                  buttonStyle={{width: '100%'}}
                  showRightIcon={true}
                />
              </View>
            )}
          </Formik>
        </View>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorContainer: {
    backgroundColor: '#FFE8E8',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LoginScreen;
