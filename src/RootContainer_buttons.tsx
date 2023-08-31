import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export function RootContainer() {
  const [sourceValue, setSourceValue] = useState('0');
  const [targetValue, setTargetValue] = useState('0');
  const onLeftPressFromSource = () => {};
  const onRightPressFromSource = () => {};
  const onLeftPressFromTarget = () => {};
  const onRightPressFromTarget = () => {};
  const onSourceValueChange = () => {};
  const onTargetValueChange = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Pressable onPress={onLeftPressFromSource} style={styles.button}>
          <Text style={styles.buttonText}>{'<'}</Text>
        </Pressable>
        <TextInput
          onChangeText={onSourceValueChange}
          keyboardType={'decimal-pad'}
          style={styles.textInput}
          defaultValue={sourceValue}
        />
        <Pressable onPress={onRightPressFromSource} style={styles.button}>
          <Text style={styles.buttonText}>{'>'}</Text>
        </Pressable>
      </View>
      <View style={styles.hairline} />
      <View style={styles.block}>
        <Pressable onPress={onLeftPressFromTarget} style={styles.button}>
          <Text style={styles.buttonText}>{'<'}</Text>
        </Pressable>
        <TextInput
          onChangeText={onTargetValueChange}
          keyboardType={'decimal-pad'}
          style={styles.textInput}
          defaultValue={targetValue}
        />
        <Pressable onPress={onRightPressFromTarget} style={styles.button}>
          <Text style={styles.buttonText}>{'>'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  block: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  button: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },

  buttonText: {
    color: 'white',
    fontWeight: '900',
  },

  textInput: {
    flex: 4,
    backgroundColor: 'blue',
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
});
