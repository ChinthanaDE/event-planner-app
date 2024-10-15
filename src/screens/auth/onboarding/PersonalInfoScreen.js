import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import {submitPersonalInfo, clearError} from '../../../redux/slices/authSlice';
import {PERSONAL_INFO, PERSONAL_INFO_SUB} from '../../../constants/constants';
import {PersonalInfoSchema} from '../../../utils/validationSchema'

const PersonalInfoScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {personalInfo, isLoading, error} = useSelector(state => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>{PERSONAL_INFO}</Text>
          <Text style={styles.subtitle}>{PERSONAL_INFO_SUB}</Text>

          <Formik
            validationSchema={PersonalInfoSchema}
            initialValues={{
              firstName: personalInfo?.firstName || '',
              lastName: personalInfo?.lastName || '',
              email: personalInfo?.email || '',
              phone: personalInfo?.phone || '',
              address: personalInfo?.address || '',
            }}
            onSubmit={async (values, {setSubmitting}) => {
              await dispatch(submitPersonalInfo(values));
              setSubmitting(false);
            }}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View>
                <CustomTextInput
                  label="First Name"
                  value={values.firstName}
                  error={errors.firstName}
                  errorText={errors.firstName}
                  touched={touched.firstName}
                  onChangeText={handleChange('firstName')}
                />
                <CustomTextInput
                  label="Last Name"
                  value={values.lastName}
                  error={errors.lastName}
                  errorText={errors.lastName}
                  touched={touched.lastName}
                  onChangeText={handleChange('lastName')}
                />
                <CustomTextInput
                  label="Email"
                  value={values.email}
                  error={errors.email}
                  errorText={errors.email}
                  touched={touched.email}
                  onChangeText={handleChange('email')}
                />
                <CustomTextInput
                  label="Phone number"
                  value={values.phone}
                  error={errors.phone}
                  errorText={errors.phone}
                  touched={touched.phone}
                  onChangeText={handleChange('phone')}
                />
                <CustomTextInput
                  label="Mailing address"
                  value={values.address}
                  error={errors.address}
                  errorText={errors.address}
                  touched={touched.address}
                  onChangeText={handleChange('address')}
                />
                <View style={styles.buttonsContainer}>
                  <CustomButton
                    title="Back"
                    onPress={() => navigation.goBack()}
                    type="secondary"
                    buttonStyle={styles.button}
                    showLeftIcon={true}
                  />
                  <CustomButton
                    title="Next"
                    onPress={handleSubmit}
                    buttonStyle={styles.button}
                    showRightIcon={true}
                    disabled={isSubmitting || isLoading}
                  />
                </View>
              </View>
            )}
          </Formik>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#Db2424" />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    width: '45%',
  },
  errorContainer: {
    backgroundColor: '#FFE8E8',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  loadingContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});

export default PersonalInfoScreen;
