import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RouteApp from './src/routes';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <RouteApp />
          </SafeAreaView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
