import { StyleSheet, View } from 'react-native';

const diameter = 200;
const data = ['kelvin', 'celsius', 'farenheit'];
const radius = diameter / 2;
const angle = (2 * Math.PI) / data.length;

export default function Wheel() {
  return (
    <View style={styles.container}>
      <View style={styles.internalWheel} />
      {data.map((item, index) => {
        const a = index * angle;
        const x = radius * Math.cos(a);
        const y = radius * Math.sin(a);
        return (
          <View
            key={index}
            style={[
              styles.triangle,
              {
                left: x,
                top: y,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  triangle: {
    width: 20,
    height: 20,
    position: 'absolute',
    backgroundColor: 'grey',
  },

  internalWheel: {
    backgroundColor: 'white',
    width: 125,
    height: 125,
    borderRadius: 1000,
    position: 'absolute',
  },
});
