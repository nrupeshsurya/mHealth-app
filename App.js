import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Daily from './screens/daily';
import Weekly from './screens/weekly';
import Monthly from './screens/monthly';

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Daily">
        <Drawer.Screen name="Daily" component={Daily} initialParams={{'date':'today!',}} />
        <Drawer.Screen name="Weekly" component={Weekly} />
        <Drawer.Screen name="Monthly" component={Monthly} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main : {
    justifyContent: 'center',
    flex: 1,
  }
});
