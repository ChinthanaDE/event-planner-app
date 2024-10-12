import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logoutUser} from '../redux/slices/authSlice';

const CustomDrawerContentView = props => {
  const dispatch = useDispatch();
  const {profileImageUrl, personalInfo, isLoading} = useSelector(
    state => state.auth,
  );
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}>
      <View style={styles.profileSection}>
     <Image source={{uri: profileImageUrl}} style={styles.profileImage} />
        <View style={styles.profileDetails}>
          <Text
            style={
              styles.profileName
            }>{`${personalInfo?.firstName} ${personalInfo?.lastName}`}</Text>
          <Text style={styles.profileEmail}>{personalInfo?.email}</Text>
        </View>
      </View>
      <View style={styles.drawerOptions}>
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            onPress={() => dispatch(logoutUser())}
            style={styles.logoutButton}>
            <AntDesign
              name="logout"
              size={20}
              color="#Db2424"
              style={[styles.logoutIcon, {transform: [{rotate: '-180deg'}]}]}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.versionText}>Version 0.0.1</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 15,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  drawerOptions: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  logoutContainer: {
    marginTop: 'inherit',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },
  logoutIcon: {
    marginRight: 15,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
});

export default CustomDrawerContentView;
