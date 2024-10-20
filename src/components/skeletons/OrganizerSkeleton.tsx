import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const OrganizerSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={styles.container}>
      <View style={styles.avatar} />
      <View style={styles.info}>
        <View style={styles.name} />
        <View style={styles.email} />
      </View>
    </View>
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
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
  info: {
    flex: 1,
  },
  name: {
    width: 120,
    height: 16,
    marginBottom: 4,
  },
  email: {
    width: 150,
    height: 14,
  },
});

export default OrganizerSkeleton;
