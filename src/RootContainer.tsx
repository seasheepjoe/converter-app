import { useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface ConversionMenuItem {
  key: string;
  value: string;
}

// TODO: add a list of categories and units
const RootContainer: React.FC = () => {
  const shouldStopFiring = useRef<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ConversionMenuItem['key']>('km');
  const [unitBase, setUnitBase] = useState<string>('km');
  const [targetstring, setTargetUnit] = useState<string>('mile');
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  const triggerSlider = (direction: 'left' | 'right') => {
    shouldStopFiring.current = true;
    console.log('slider moves ', direction);
    setUnitBase('mile');
  };

  const gesture = useMemo(() => {
    let originX = 0;
    let originY = 0;
    return Gesture.Pan()
      .onBegin(event => {
        shouldStopFiring.current = false;
        originX = event.x;
        originY = event.y;
      })
      .onChange(event => {
        if (shouldStopFiring.current === true) {
          return;
        }

        // prevent triggering slider when user is exceeds sliders vertical zone.
        if (
          event.y > originY &&
          event.y >= (frame.height - insets.top - insets.bottom) / 2
        ) {
          release();
          return;
        } else if (
          event.y < originY &&
          event.y <= (frame.height - insets.top - insets.bottom) / 2
        ) {
          release();
          return;
        }

        if (originX < event.x && event.x - originX >= frame.width / 4) {
          triggerSlider('left');
        } else if (originX > event.x && event.x - originX <= -frame.width / 4) {
          triggerSlider('right');
        }
      })
      .onEnd(() => {
        console.log('on pan end');
      })
      .maxPointers(1)
      .runOnJS(true)
      .shouldCancelWhenOutside(true);
  }, [frame.height, frame.width, insets.bottom, insets.top]);

  const release = () => {
    console.log('will release');
    shouldStopFiring.current = true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <View style={styles.content}>
          <View style={styles.block}>
            <Animated.Text
              style={styles.text}
              entering={SlideInLeft}
              exiting={SlideOutRight}
              key={unitBase}>
              123
            </Animated.Text>
          </View>
          <View style={styles.hairline} />
          <View style={styles.block}>
            <Text style={styles.text}>123</Text>
          </View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
};

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

    content: {
      width: '100%',
      height: height - insets.top - insets.bottom,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
    },

    hairline: {
      width: '100%',
      height: StyleSheet.hairlineWidth,
      backgroundColor: 'gray',
    },

    block: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    text: {
      color: '#fff',
    },
  });
};

export { RootContainer };
