import { StyleSheet, Text, View } from 'react-native';
import DailyNotes from './components/dailyNotes/DailyNotes';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        {/* <Text>Restaurant-Management-App</Text> */}
        <Tab.Navigator>
        <Tab.Screen name="dailyNotes" component={DailyNotes}
            options={{
              title: "dailyNotes",
            }} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
