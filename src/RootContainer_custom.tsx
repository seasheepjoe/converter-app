import { useState } from 'react';
import {
  LayoutChangeEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function RootContainer() {
  const styles = useStyles();
  return (
    <SafeAreaView style={styles.container}>
      <Carousel />
      <View style={styles.hairline} />
      <Carousel />
    </SafeAreaView>
  );
}

type TextData = {
  index: number;
  width: number;
  height: number;
};

function Carousel() {
  const [sizes, setSizes] = useState<TextData[]>([]);
  const items = [
    'day',
    'hour',
    'microsecond',
    'millisecond',
    'minute',
    'month',
    'nanosecond',
    'picosecond',
    'second',
    'week',
    'year',
  ];
  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {},
  });
  const radius = 125;
  const onTextLayout = (event: LayoutChangeEvent, index: number) => {
    const { width, height } = event.nativeEvent.layout;
    setSizes(textSizes => [...textSizes, { index, width, height }]);
  };
  const getTextPosition = (textSize: TextData | undefined, index: number) => {
    if (!textSize) return;
    const { width, height } = textSize;
    const x =
      circleCenter +
      (radius - height / 2) * Math.cos(angle * index - Math.PI / 2);
    const y =
      circleCenter +
      (radius - height / 2) * Math.sin(angle * index - Math.PI / 2);
    return { left: x - width / 2, top: y - height / 2 };
  };
  const angle = (2 * Math.PI) / items.length;
  const circleCenter = radius;
  const styles = useCarouselStyles();
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <View style={styles.container}>
        <Animated.View style={styles.circleContainer}>
          {items.map((u, index) => (
            <Text
              key={index}
              style={[
                styles.text,
                getTextPosition(
                  sizes.find(size => size.index === index),
                  index,
                ),
              ]}
              onLayout={e => onTextLayout(e, index)}>
              {u}
            </Text>
          ))}
        </Animated.View>
      </View>
    </PanGestureHandler>
  );
}

const useCarouselStyles = () => {
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'red',
      transform: [{ matrix: [90, 45] }],
    },

    circleContainer: {
      width: 250,
      height: 250,
      borderWidth: 1,
      borderColor: 'yellow',
      borderRadius: 1000,
    },

    text: {
      position: 'absolute',
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      borderWidth: 1,
      borderColor: 'blue',
    },
  });
};

const useStyles = () => {
  const { width, height } = useSafeAreaFrame();

  return StyleSheet.create({
    container: {
      backgroundColor: '#000',
      width,
      height,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },

    hairline: {
      width: '100%',
      height: StyleSheet.hairlineWidth,
      backgroundColor: 'gray',
    },
  });
};

export { RootContainer };
