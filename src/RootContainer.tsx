import { ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  TextInput,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { ConversionCategoryType } from './types';
import { conversionOptions } from './constants';
import * as utils from './utils/array';
import { Converter } from './utils/converter';
import fr from './translations/fr.json';

let tapCount: number = 1;

export default function RootContainer() {
  const [category, setCategory] =
    useState<ConversionCategoryType>('temperature');
  const converter = useRef<Converter>(new Converter(category));
  const [sourceUnit, setSourceUnit] = useState(
    conversionOptions[category].items[0],
  );
  const [convertedUnit, setConvertedUnit] = useState(
    conversionOptions[category].items[1],
  );
  const [sourceValue, setSourceValue] = useState<string>('0');
  const [convertedValue, setConvertedValue] = useState<string>('0');
  const onSourceUnitSwipeLeft = () => {
    const arr = conversionOptions[category].items;
    const nextUnit = utils.nextInArray(arr, sourceUnit);
    setSourceUnit(nextUnit as typeof sourceUnit);
    if (nextUnit === convertedUnit) {
      setConvertedUnit(
        utils.nextInArray(arr, convertedUnit) as typeof convertedUnit,
      );
    }
  };
  const onSourceUnitSwipeRight = () => {
    const arr = conversionOptions[category].items;
    const previousUnit = utils.previousInArray(arr, sourceUnit);
    setSourceUnit(previousUnit as typeof sourceUnit);
    if (previousUnit === convertedUnit) {
      setConvertedUnit(
        utils.nextInArray(arr, convertedUnit) as typeof convertedUnit,
      );
    }
  };
  const onConvertedUnitSwipeLeft = () => {
    const arr = conversionOptions[category].items;
    const nextUnit = utils.nextInArray(arr, convertedUnit);
    setConvertedUnit(nextUnit as typeof convertedUnit);
    if (nextUnit === sourceUnit) {
      setSourceUnit(
        utils.previousInArray(arr, sourceUnit) as typeof sourceUnit,
      );
    }
  };
  const onConvertedUnitSwipeRight = () => {
    const arr = conversionOptions[category].items;
    const previousUnit = utils.previousInArray(arr, convertedUnit);
    setConvertedUnit(previousUnit as typeof convertedUnit);
    if (previousUnit === sourceUnit) {
      setSourceUnit(utils.nextInArray(arr, sourceUnit) as typeof sourceUnit);
    }
  };
  const onBaseValueChange = (n: string) => {
    if (n.length <= 0) {
      return;
    }
    setSourceValue(n);
    convert(n, 'target');
  };
  const onTargetValueChange = (n: string) => {
    if (n.length <= 0) {
      return;
    }
    setConvertedValue(n);
    convert(n, 'base');
  };
  const convert = (n: string, operation: 'target' | 'base') => {
    let result = converter.current.convert(n, sourceUnit, convertedUnit);
    if (operation === 'base') {
      setSourceValue(result);
    } else if (operation === 'target') {
      setConvertedValue(result);
    }
  };
  const tap = () => {
    if (tapCount >= 2) {
      openCategoriesSelector();
    } else {
      tapCount += 1;
      setTimeout(() => {
        tapCount = 1;
      }, 300);
    }
  };
  const openCategoriesSelector = () => {
    Alert.alert(
      "Choisissez un type d'unité",
      '',
      Object.keys(conversionOptions).map(key => ({
        text: fr[`category_${key}`],
        onPress: () => {
          converter.current = new Converter(key);
          setCategory(key);
          setSourceUnit(conversionOptions[key].items[0]);
          setConvertedUnit(conversionOptions[key].items[1]);
        },
      })),
    );
  };
  const styles = useStyles();
  return (
    <TouchableWithoutFeedback onPress={tap}>
      <SafeAreaView style={styles.container}>
        <Swiper
          onSwipeLeft={onSourceUnitSwipeLeft}
          onSwipeRight={onSourceUnitSwipeRight}>
          <TextInput
            onChangeText={onBaseValueChange}
            keyboardType={'decimal-pad'}
            style={styles.textInput}
            defaultValue={sourceValue}
          />
          <View style={styles.unitContainer}>
            <Animated.Text key={sourceUnit} style={styles.unitText}>
              {fr[`unit_${sourceUnit}`]}
            </Animated.Text>
          </View>
        </Swiper>
        <View style={styles.hairline} />
        <Swiper
          onSwipeLeft={onConvertedUnitSwipeLeft}
          onSwipeRight={onConvertedUnitSwipeRight}>
          <TextInput
            onChangeText={onTargetValueChange}
            keyboardType={'decimal-pad'}
            style={styles.textInput}
            defaultValue={convertedValue}
          />
          <View style={styles.unitContainer}>
            <Animated.Text key={convertedUnit} style={styles.unitText}>
              {fr[`unit_${convertedUnit}`]}
            </Animated.Text>
          </View>
        </Swiper>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

interface CarouselProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: ReactNode;
}

function Swiper({ onSwipeLeft, onSwipeRight, children }: CarouselProps) {
  const shouldStopFiring = useRef<boolean>(true);
  const triggerSwiper = useCallback(
    (direction: 'left' | 'right') => {
      shouldStopFiring.current = true;
      if (direction === 'left') {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    },
    [onSwipeLeft, onSwipeRight],
  );
  const gesture = useMemo(() => {
    return Gesture.Pan()
      .onStart(() => {
        shouldStopFiring.current = false;
      })
      .onChange(e => {
        if (shouldStopFiring.current === true) return;
        if (e.velocityX < 0) {
          triggerSwiper('right');
        } else if (e.velocityX > 0) {
          triggerSwiper('left');
        }
      })
      .activeOffsetX([100, -100])
      .minVelocityX(150)
      .runOnJS(true);
  }, [triggerSwiper]);
  const styles = useCarouselStyles();
  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>{children}</View>
    </GestureDetector>
  );
}

const useCarouselStyles = () => {
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      borderWidth: 1,
      borderColor: 'red',
      flex: 1,
    },

    text: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
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

    unitContainer: {
      position: 'absolute',
      right: 25,
      bottom: 25,
    },

    unitText: {
      color: '#fff',
      fontWeight: '500',
      fontSize: 24,
    },

    textInput: {
      color: 'white',
      fontSize: 50,
      fontWeight: 'bold',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      paddingHorizontal: 25,
    },
  });
};

export { RootContainer };
