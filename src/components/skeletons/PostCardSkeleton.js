import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const PostCardSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={styles.container}>
      <View style={styles.image} />
      <View style={styles.content}>
        <View style={styles.title} />
        <View style={styles.description} />
      </View>
    </View>
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
    height: 100,
  },
  title: {
    width: '80%',
    height: 18,
    marginBottom: 8,
  },
  description: {
    width: '100%',
    height: 14,
  },
});

export default PostCardSkeleton;
