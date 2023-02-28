import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootContainer } from './src/RootContainer';

const App = () => {
  return (
    <SafeAreaProvider>
      <RootContainer />
    </SafeAreaProvider>
  );
};

export { App };
