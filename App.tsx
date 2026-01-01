import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { Main } from './src/Main';
import { registerRootComponent } from 'expo';
import { PersistGate } from 'redux-persist/integration/react';
import { View, ActivityIndicator } from 'react-native';

const LoadingState = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingState />} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}

registerRootComponent(App);
