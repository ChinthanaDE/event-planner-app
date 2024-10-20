import {useState, useRef, useEffect} from 'react';
import {Animated, Dimensions, ScrollView} from 'react-native';

const {width} = Dimensions.get('window');

interface UseImageCarouselProps {
  images: string[];
  autoPlayInterval?: number;
}

interface UseImageCarouselReturn {
  currentIndex: number;
  scrollViewRef: React.RefObject<ScrollView>;
  handleScroll: (event: any) => void;
}

export const useImageCarousel = ({
  images,
  autoPlayInterval = 5000,
}: UseImageCarouselProps): UseImageCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

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
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIndex, images.length, autoPlayInterval]);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  return {
    currentIndex,
    scrollViewRef,
    handleScroll,
  };
};
