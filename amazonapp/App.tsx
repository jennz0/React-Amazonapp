/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import "react-native-gesture-handler"
import HomesScreen from './src/screens/HomeScreen';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  
} from 'react-native/Libraries/NewAppScreen';
import Router from './src/router';
// import ProductScreen from './src/screens/ProductScreen';
// //import Icon from 'react-native-vector-icons/FontAwesome';
// import ShopCartScreen from './src/screens/ShopCartScreen';
// import AddressScreen from './src/screens/AddressScreen';




const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <HomesScreen/> */}
      {/* <ProductScreen /> */}
      {/* <ShopCartScreen /> */}
      {/* <AddressScreen /> */}
      <Router />
    </SafeAreaView>
  );
};



export default App;
