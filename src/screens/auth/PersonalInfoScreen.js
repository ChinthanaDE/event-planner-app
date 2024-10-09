import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Formik} from 'formik';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo } from '../../redux/slices/authSlice';

const PersonalInfoScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const { personalInfo } = useSelector((state) => state.auth);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Personal info</Text>
        <Text style={styles.subtitle}>
          You can add your personal data now or do it later
        </Text>

        <Formik
          initialValues={{
            firstName: personalInfo?.firstName || '',
            lastName: personalInfo?.lastName || '',
            email: personalInfo?.email || '',
            phone: personalInfo?.phone || '',
            address: personalInfo?.address || '',
          }}
          onSubmit={(values) => {
            dispatch(updatePersonalInfo(values));
            navigation.navigate('Home');
          }}>
          {({handleChange, handleSubmit, values}) => (
            <View>
              <CustomTextInput
                label="First Name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
              />
              <CustomTextInput
                label="Last Name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
              />
              <CustomTextInput
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <CustomTextInput
                label="Phone number"
                value={values.phone}
                onChangeText={handleChange('phone')}
              />
              <CustomTextInput
                label="Mailing address"
                value={values.address}
                onChangeText={handleChange('address')}
              />
              <View style={styles.buttonsContainer}>
                <CustomButton
                  title="Back"
                  onPress={() => navigation.goBack()}
                  type="secondary"
                  buttonStyle={{ width: '45%'}} 
                  showLeftIcon={true}
                />
                <CustomButton
                  title="Next"
                  onPress={handleSubmit}
                  buttonStyle={{ width: '45%' }} 
                  showRightIcon={true}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
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
  },
});

export default PersonalInfoScreen;
