import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductItem from '../../components/ProductItem';
import { DataStore } from 'aws-amplify';
import { Product } from '../../models';

const HomesScreen = ({searchValue} : {searchValue : string}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct =async () => {
      const results = await DataStore.query(Product);
      setProducts(results);
    };
    fetchProduct();
    //or
    //DataStore.query(Product).then((results => setProducts(results)));
  }, []);

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