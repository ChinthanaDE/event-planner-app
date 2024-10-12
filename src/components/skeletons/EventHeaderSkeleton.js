import React from 'react';
import { View, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width } = Dimensions.get('window');

const EventHeaderSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={{ width, height: 300 }} />
  </SkeletonPlaceholder>
);

export default EventHeaderSkeleton;