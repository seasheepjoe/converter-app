import { useCallback, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInUp,
  SlideOutDown,
} from 'react-native-reanimated';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

interface VerticalTextProps {
  text: string;
  style: StyleProp<ViewStyle>;
  maxHeight: number;
}

export function VerticalText({
  text,
  style,
  maxHeight = 0,
}: VerticalTextProps) {
  const [fontSize, setFontSize] = useState<number>(30);
  const onLayout = useCallback<(e: LayoutChangeEvent) => void>(
    e => {
      const h = e.nativeEvent.layout.height;
      if (h > maxHeight) {
        setFontSize(fontSize - 2);
      }
    },
    [fontSize, maxHeight, text],
  );
  const styles = useStyles({ fontSize });
  return (
    <View style={[styles.container, style && style]} onLayout={onLayout}>
      {text.split('').map(t => (
        <Animated.Text style={styles.text}>{t}</Animated.Text>
      ))}
    </View>
  );
}

const useStyles = ({ fontSize }: { fontSize: number }) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    text: {
      color: '#fff',
      fontSize,
      fontWeight: '900',
      opacity: 0.4,
    },
  });
};
