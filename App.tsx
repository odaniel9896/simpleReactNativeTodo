import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Register} from './src/pages/Register';
import {Home} from './src/pages/Home';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';

const App: React.FC = () => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
