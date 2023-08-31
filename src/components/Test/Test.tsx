import { useState } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function Test() {
  const [items, setItems] = useState([
    {
      text: 'kelvin',
    },
    {
      text: 'celsius',
    },
    {
      text: 'farenheit',
    },
  ]);
  const renderText = ({ item }) => {
    return <Text>{item.text}</Text>;
  };
  const loadMore = () => {
    setItems(prev => [...prev, ...items]);
  };
  return (
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 1000,
        transform: [
          {
            rotateX: '45deg',
          },
        ],
      }}>
      <Text
        style={{
          color: 'black',
        }}>
        {'Hey'}
      </Text>
    </View>
  );
}
