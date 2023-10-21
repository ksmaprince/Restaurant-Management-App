import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './core/theme'

import { StartScreen, LoginScreen, RegisterScreen, ResetPasswordScreen, DashboardScreen, WelcomeScreen, } from './components/screens'
import { GlobalContext } from './context/GlobalContext';

const Stack = createNativeStackNavigator()
export default function App() {

  const [globalState, setGlobalState] = useState({userInfo: null, foodData: []})

  return (
    <GlobalContext.Provider value={{globalState, setGlobalState}}>
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="WelcomeScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    </GlobalContext.Provider>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
