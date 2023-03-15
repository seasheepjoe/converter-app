import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function RootContainer() {
  const styles = useStyles();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', height: '100%' }}>
        <Carousel />
        <View style={styles.hairline} />
        <Carousel />
      </View>
    </SafeAreaView>
  );
}

function Carousel() {
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
  const viewX = useSharedValue(0);
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { originX: number; lastX: number; initialVelocityX: number }
  >({
    onStart: (event, ctx) => {
      ctx.originX = event.absoluteX;
      ctx.lastX = ctx.lastX || 0;
      // ctx.initialVelocityX = event.velocityX;
    },
    onActive: (event, ctx) => {
      console.log(ctx.lastX);
      viewX.value = event.translationX + ctx.lastX;
    },
    onEnd: (event, ctx) => {
      console.log(event);
      ctx.lastX = event.absoluteX;
      console.log('end');
    },
  });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: viewX.value,
        },
      ],
    };
  });
  const frame = useSafeAreaFrame();
  const [scrollViewContentWidth, setScrollViewContentWidth] =
    useState<number>(0);
  console.log(scrollViewContentWidth);
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        onLayout={event => {
          setScrollViewContentWidth(event.nativeEvent.layout.width);
        }}
        style={[
          {
            borderWidth: 1,
            borderColor: 'red',
            // minWidth: '100%',
            width: scrollViewContentWidth || '100%',
            height: '50%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexGrow: 1,
          },
          animatedStyles,
        ]}>
        {items.map(item => (
          <Animated.Text
            style={{
              fontSize: 14,
              color: '#fff',
              // marginRight: frame.width / 5,
            }}>
            {item}
          </Animated.Text>
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
}

const useStyles = () => {
  const { width, height } = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      backgroundColor: '#000',
      width,
      height,
      justifyContent: 'center',
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
