import { Fragment, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

interface UnitObject {
  unit: string;
  value: string;
}

export function RootContainer() {
  const [source, setSource] = useState<UnitObject>({
    unit: '',
    value: '',
  });
  const [target, setTarget] = useState<UnitObject>({
    unit: '',
    value: '',
  });

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.square}>
          <Text style={styles.text}>{'upper'}</Text>
        </View>
        <View style={styles.hairlineSeparator} />
        <View style={styles.square}>
          <Text style={styles.text}>{'lower'}</Text>
        </View>
      </SafeAreaView>
      <FloatingList
        data={[
          {
            name: 'Kelvin',
            value: 'kelvin',
          },
          {
            name: 'Celsius',
            value: 'celsius',
          },
          {
            name: 'Farenheit',
            value: 'farenheit',
          },
        ]}
        onSelect={() => {}}
      />
    </Fragment>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#000',
  },

  square: {
    flex: 1,
  },

  hairlineSeparator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
  },

  text: {
    color: '#fff',
  },
});
