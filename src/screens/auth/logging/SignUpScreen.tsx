import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import {signup, setError, clearError} from '../../../redux/slices/authSlice';
import {WELCOME_TITLE, WELCOME_SUBTITLE} from '../../../constants/constants';
import {SignUpSchema} from '../../../utils/validationSchema';
import {AppDispatch, RootState} from '../../../redux/store';
import {CombinedNavigationProp} from '../../../types/navigation';

type SignUpScreenProps = {
  navigation: CombinedNavigationProp;
};

interface SignUpValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, error} = useSelector((state: RootState) => state.auth);

  const handleSignUp = async (values: SignUpValues) => {
    if (values.password !== values.confirmPassword) {
      dispatch(setError('Passwords do not match'));
      return;
    }
    const success = await dispatch(signup(values.email, values.password));
    if (success) {
      navigation.navigate('ImageUpload');
    }
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
          <ActivityIndicator
            size="large"
            color="#Db2424"
            testID="loading-indicator"
          />
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

          <Formik<SignUpValues>
            initialValues={{email: '', password: '', confirmPassword: ''}}
            validationSchema={SignUpSchema}
            onSubmit={handleSignUp}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              handleBlur,
            }) => (
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
                  onBlur={handleBlur('email')}
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
                  onBlur={handleBlur('password')}
                />
                <CustomTextInput
                  label="Confirm Password"
                  icon={<EvilIcons name="lock" size={24} color="gray" />}
                  placeholder="Confirm Password"
                  secureTextEntry
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  errorText={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
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
                  onPress={() => {
                    dispatch(clearError());
                    navigation.navigate('Login');
                  }}
                  buttonStyle={{width: '100%'}}
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
