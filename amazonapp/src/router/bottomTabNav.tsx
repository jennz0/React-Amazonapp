import React from 'react'
import ProductScreen from '../screens/ProductScreen';
import ShopCartScreen from '../screens/ShopCartScreen';
import ShopCartStack from './ShopCartStack';
import AddressScreen from '../screens/AddressScreen';
import HomesScreen from '../screens/HomeScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Entypo from 'react-native-vector-icons/Entypo'
import HomeStack from './HomeStack';


const Tab = createBottomTabNavigator();


const BottomTabNav = () => {     
  return (
      <Tab.Navigator tabBarOptions = {{showLabel : false, 
                                        inactiveTintColor: "#fbd7de",
                                        activeTintColor : "#e47911"}}
                     screenOptions = {{headerShown : false}}>
            <Tab.Screen component={HomeStack} 
                        name = "Home"
                        options={{tabBarIcon : ({color}) => (<Entypo name="home" color={color} size={19}/>),}}
                         />
            <Tab.Screen component={ShopCartStack} 
                        name = "ShopCart"
                        options={{tabBarIcon : ({color}) => (<Entypo name="shopping-cart" color={color} size={19}/>),}}/>
            <Tab.Screen component={HomesScreen} 
                        name = "Profile"
                        options={{tabBarIcon : ({color}) => <Entypo name="user" color={color} size={19}/>}}/>
            <Tab.Screen component={HomesScreen} 
                        name = "More"
                        options={{tabBarIcon : ({color}) => <Entypo name="menu" color={color} size={19}/>}}/>
        </Tab.Navigator>
  );
};

export default BottomTabNav