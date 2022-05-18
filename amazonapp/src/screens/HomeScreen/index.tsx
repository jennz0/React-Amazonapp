import React from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductItem from '../../components/ProductItem';
import products from '../../data/products';

const HomesScreen = () => {
  return (
    <View style = {styles.page}>
      {/*render products*/}
      <FlatList 
            data={products} 
            renderItem = {({item}) => <ProductItem item = {item}/>} 
            showsHorizontalScrollIndicator={false}
        />
      {/* <ProductItem item = {products[0]}/>
      <ProductItem item = {products[2]}/>
      <ProductItem item = {products[3]}/> */}
    </View>
  )
}

const styles = StyleSheet.create({
    page: {
        padding : 10,
    },
    
});

export default HomesScreen