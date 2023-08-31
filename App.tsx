import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootContainer } from './src/RootContainer_list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <RootContainer />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export { App };
