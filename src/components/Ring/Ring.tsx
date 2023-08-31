import { useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';

interface RingProps {
  data: RingItem[];
}

interface RingItem {
  text: string;
}

export default function Ring({ data = [] }: RingProps) {
  const [elements, setElements] = useState<RingItem[]>(data);
  const renderRingItem: ListRenderItem<RingItem> = ({ item }) => {
    return <Text>{item.text}</Text>;
  };
  const load = () => {
    setElements(els => [...els, ...elements]);
  };
  return (
    <FlatList<RingItem>
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      horizontal
      renderItem={renderRingItem}
      data={data}
      keyExtractor={item => item.text}
      // onEndReached={load}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      // onScrollEndDrag={}
      // onEndReachedThreshold={0.25}
      onScrollAnimationEnd={() => console.log('on scroll end')}
      // initialScrollIndex={Math.floor(data.length / 2)}
      // getItemLayout={(_item, index) => ({
      //   length: 10,
      //   offset: 10 * index,
      //   index,
      // })}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'red',
    alignSelf: 'center',
  },

  contentContainer: {
    width: '50%',
  },

  item: {
    color: '#000',
    fontSize: 15,
  },

  separator: {
    width: 50,
    height: 0,
  },
});
