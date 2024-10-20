import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useImageCarousel} from '../hooks/useImageCarousel';

const {width} = Dimensions.get('window');

interface EventHeaderProps {
  images: string[];
  eventName: string;
  location: string;
}

const EventHeader: React.FC<EventHeaderProps> = ({
  images,
  eventName,
  location,
}) => {
  const {currentIndex, scrollViewRef, handleScroll} = useImageCarousel({
    images,
  });

  return (
    <View style={styles.headerContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScroll}>
        {images.map((image, index) => (
          <Image key={index} source={{uri: image}} style={styles.headerImage} />
        ))}
      </ScrollView>

      <View style={styles.imageCounter}>
        <Text style={styles.imageCounterText}>
          {`${currentIndex + 1}/${images.length}`}
        </Text>
      </View>

      <View style={styles.headerTextContainer}>
        <Text style={styles.eventName}>{eventName}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 300,
  },
  headerImage: {
    position: 'relative',
    width: width,
    height: 300,
  },
  headerTextContainer: {
    padding: 16,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  location: {
    fontSize: 16,
    marginTop: 10,
    color: '#000',
  },
  imageCounter: {
    position: 'absolute',
    right: 10,
    bottom: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  imageCounterText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default EventHeader;
