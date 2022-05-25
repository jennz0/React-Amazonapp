import { View, Text } from 'react-native'
import React,{useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomesScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather'

const Stack = createStackNavigator();

interface HeaderComponentProps {
  searchValue : string;
  setSearchValue : () => void;
}

const HeaderComponent = ({searchValue, setSearchValue}: HeaderComponentProps) => {
  return(
    <SafeAreaView style = {{backgroundColor : '#22e3dd'}}>
      <View style={{margin: 10, backgroundColor:"white", paddingLeft: 10, flexDirection:"row", alignItems:"center"}}>
        <Feather name = "search" size= {20}/>
        <TextInput style={{height:40}} placeholder='Search item' value={searchValue} onChangeText={setSearchValue}/>

      </View>
    </SafeAreaView>
  )
}

const HomeStack = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Stack.Navigator
        screenOptions={{
          header : () => <HeaderComponent searchValue={searchValue} setSearchValue={setSearchValue}/>
        }}>
            <Stack.Screen name="HomeScreen" options={{title : 'Home'}}> 
              {() => <HomesScreen searchValue={searchValue}/>}
            </Stack.Screen>
            <Stack.Screen component={ProductScreen} name="ProductDetails" />
    </Stack.Navigator>
  )
}

export default HomeStack