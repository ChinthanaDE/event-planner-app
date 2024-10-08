import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

const EventHeader = ({ images, eventName, location }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
        scrollViewRef.current?.scrollTo({
          x: (currentIndex + 1) * width,
          animated: true,
        });
      } else {
        setCurrentIndex(0);
        scrollViewRef.current?.scrollTo({
          x: 0,
          animated: true,
        });
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, images.length]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.headerContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScroll}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.headerImage} />
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
    paddingVertical:8
  },
  imageCounterText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default EventHeader;