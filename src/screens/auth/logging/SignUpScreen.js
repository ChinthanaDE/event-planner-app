import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {signup, setError, clearError} from '../../../redux/slices/authSlice';
import {WELCOME_TITLE, WELCOME_SUBTITLE} from '../../../constants/constants';

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading, error} = useSelector(state => state.auth);

  const handleSignUp = values => {
    if (values.password !== values.confirmPassword) {
      dispatch(setError('Passwords do not match'));
      return;
    }
    dispatch(signup(values.email, values.password));
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
            initialValues={{email: '', password: '', confirmPassword: ''}}
            validationSchema={SignUpSchema}
            onSubmit={handleSignUp}>
            {({handleChange, handleSubmit, values, errors, touched}) => (
              <View>
                <CustomTextInput
                  label="Email"
                  icon={<EvilIcons name="envelope" size={24} color="gray" />}
                  placeholder="Enter email"
                  value={values.email}
                  error={errors.email}
                  errorText={errors.email}
                  touched={touched.email}
                  onChangeText={handleChange('email')}
                />
                <CustomTextInput
                  label="Password"
                  placeholder="Enter password"
                  icon={<EvilIcons name="lock" size={24} color="gray" />}
                  secureTextEntry
                  value={values.password}
                  error={errors.password}
                  errorText={errors.password}
                  touched={touched.password}
                  onChangeText={handleChange('password')}
                />
                <CustomTextInput
                  label="Confirm Password"
                  placeholder="Retype Password "
                  icon={<EvilIcons name="lock" size={24} color="gray" />}
                  secureTextEntry
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  errorText={errors.confirmPassword}
                  touched={touched.confirmPassword}
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

export default SignUpScreen;
