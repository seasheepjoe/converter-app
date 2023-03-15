import { useRef, useMemo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { StyleProp, View, ViewStyle } from 'react-native';

interface SliderProps {
  onSlideLeft: () => void;
  onSlideRight: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Slider({
  onSlideLeft,
  onSlideRight,
  children,
  style,
}: SliderProps) {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const shouldStopFiring = useRef<boolean>(false);
  const release = () => {
    shouldStopFiring.current = true;
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
          shouldStopFiring.current = true;
          onSlideLeft();
        } else if (originX > event.x && event.x - originX <= -frame.width / 4) {
          shouldStopFiring.current = true;
          onSlideRight();
        }
      })
      .maxPointers(1)
      .runOnJS(true)
      .shouldCancelWhenOutside(true);
  }, [
    frame.height,
    frame.width,
    insets.bottom,
    insets.top,
    onSlideLeft,
    onSlideRight,
  ]);
  return (
    <GestureDetector gesture={gesture}>
      <View style={style && style}>{children ? children : null}</View>
    </GestureDetector>
  );
}
