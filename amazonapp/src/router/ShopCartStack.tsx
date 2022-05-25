import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ShopCartScreen from '../screens/ShopCartScreen';
import AddressScreen from '../screens/AddressScreen';


const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
            <Stack.Screen component={ShopCartScreen} 
                          name="Cart" 
                          options={{title : 'Shopping Cart'}}/>
            <Stack.Screen component={AddressScreen} name="Address" />
    </Stack.Navigator>
  )
}

export default HomeStack