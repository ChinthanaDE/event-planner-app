import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Organizer = ({name, email, avatarUrl}) => (
  <TouchableOpacity style={styles.organizerContainer}>
    {avatarUrl && <Image source={{uri: avatarUrl}} style={styles.avatar} />}
    <View style={styles.organizerInfo}>
      <Text style={styles.organizerName}>{name}</Text>
      <Text style={styles.organizerEmail}>{email}</Text>
    </View>
    <Ionicons name="chatbox-ellipses-outline" size={24} color="#000" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '500',
  },
  organizerEmail: {
    fontSize: 14,
    color: '#666',
  },
});

export default Organizer;
