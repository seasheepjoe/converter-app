import { useMemo, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ConversionCategoryType } from './types';
import { conversionOptions } from './constants';
import * as utils from './utils/array';
import { Converter } from './utils/converter';
import fr from './translations/fr.json';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { VerticalText } from './components/VerticalText';
import LinearGradient from 'react-native-linear-gradient';

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
  const onLeftPressFromSource = () => {
    const arr = conversionOptions[category].items;
    const nextUnit = utils.nextInArray(arr, sourceUnit);
    setSourceUnit(nextUnit as typeof sourceUnit);
    if (nextUnit === convertedUnit) {
      setConvertedUnit(
        utils.nextInArray(arr, convertedUnit) as typeof convertedUnit,
      );
    }
  };
  const onRightPressFromSource = () => {
    const arr = conversionOptions[category].items;
    const previousUnit = utils.previousInArray(arr, sourceUnit);
    setSourceUnit(previousUnit as typeof sourceUnit);
    if (previousUnit === convertedUnit) {
      setConvertedUnit(
        utils.nextInArray(arr, convertedUnit) as typeof convertedUnit,
      );
    }
  };
  const onLeftPressFromTarget = () => {
    const arr = conversionOptions[category].items;
    const nextUnit = utils.nextInArray(arr, convertedUnit);
    setConvertedUnit(nextUnit as typeof convertedUnit);
    if (nextUnit === sourceUnit) {
      setSourceUnit(
        utils.previousInArray(arr, sourceUnit) as typeof sourceUnit,
      );
    }
  };
  const onRightPressFromTarget = () => {
    const arr = conversionOptions[category].items;
    const previousUnit = utils.previousInArray(arr, convertedUnit);
    setConvertedUnit(previousUnit as typeof convertedUnit);
    if (previousUnit === sourceUnit) {
      setSourceUnit(utils.nextInArray(arr, sourceUnit) as typeof sourceUnit);
    }
  };
  const onSourceValueChange = (n: string) => {
    if (n.length <= 0) {
      return;
    }
    setSourceValue(n);
    convert(n, 'target');
  };
  const onConvertedValueChange = (n: string) => {
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
  const frame = useSafeAreaFrame();
  const maxHeight = useMemo(() => {
    return frame.height / 2;
  }, [frame]);
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Pressable onPress={onLeftPressFromSource} style={styles.button}>
          <VerticalText
            text={utils.previousInArray(
              conversionOptions[category].items,
              sourceUnit,
            )}
            style={styles.floatingText}
            maxHeight={maxHeight}
          />
        </Pressable>
        <TextInput
          onChangeText={onSourceValueChange}
          keyboardType={'decimal-pad'}
          style={styles.textInput}
          defaultValue={sourceValue}
        />
        <Pressable onPress={onRightPressFromSource} style={styles.button}>
          <VerticalText
            text={utils.nextInArray(
              conversionOptions[category].items,
              sourceUnit,
            )}
            style={styles.floatingText}
            maxHeight={maxHeight}
          />
        </Pressable>
      </View>
      <View style={styles.middle}>
        <Text style={styles.currentUnit}>{sourceUnit}</Text>
        <View style={styles.hairline} />
        <Text style={styles.currentUnit}>{convertedUnit}</Text>
      </View>
      <View style={styles.block}>
        <Pressable onPress={onLeftPressFromTarget} style={styles.button}>
          <LinearGradient colors={['#000', '#0f0']} />
          <VerticalText
            text={utils.previousInArray(
              conversionOptions[category].items,
              convertedUnit,
            )}
            style={styles.floatingText}
            maxHeight={maxHeight}
          />
        </Pressable>
        <TextInput
          onChangeText={onConvertedValueChange}
          keyboardType={'decimal-pad'}
          style={styles.textInput}
          defaultValue={convertedValue}
        />
        <Pressable onPress={onRightPressFromTarget} style={styles.button}>
          <VerticalText
            text={utils.nextInArray(
              conversionOptions[category].items,
              sourceUnit,
            )}
            style={styles.floatingText}
            maxHeight={maxHeight}
          />
        </Pressable>
      </View>
    </View>
  );
}

const useStyles = () => {
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
    },

    floatingText: {
      position: 'absolute',
      zIndex: 10,
    },

    block: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },

    middle: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    button: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    buttonText: {
      color: 'white',
      fontWeight: '900',
    },

    textInput: {
      flex: 4,
      color: 'white',
      fontSize: 50,
      fontWeight: 'bold',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },

    hairline: {
      width: '100%',
      height: StyleSheet.hairlineWidth,
      backgroundColor: 'gray',
    },

    currentUnit: {
      color: '#fff',
      zIndex: 11,
      fontWeight: 'bold',
      fontSize: 12,
      marginVertical: 5,
    },
  });
};

export { RootContainer };
