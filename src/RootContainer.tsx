import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RootContainer: React.FC = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>{'hello'}</Text>
      </View>
    </SafeAreaView>
  );
};

export { RootContainer };
