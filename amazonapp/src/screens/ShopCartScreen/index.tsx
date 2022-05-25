import React from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CartProductItem from '../../components/CartProductItem';
import QuantitySelector from '../../components/quantitySelector';
import products from '../../data/cart';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const ShopCartScreen = () => {
    const totalPrice = products.reduce((summed, product) => summed + product.item.price * product.quantity ,0)
    const navigation = useNavigation();
    const onCheckout = () => {
        navigation.navigate("Address");
    }

  
    return (
    <View style = {styles.page}>
        <View>
            <Text style = {{fontSize : 20, fontWeight : "bold"}}>
                Subtotal of {products.length} Items :  
                <Text style = {{color : "#e47911"}}> ${totalPrice.toFixed(2)}</Text>
            </Text>
        </View>

        <Button text='Proceed to Checkout' 
                onPress={onCheckout}
                containerStyle = {{backgroundColor : "#f7e300"}}/>

      {/*render products*/}
      <FlatList 
            data={products} 
            renderItem = {({item}) => (
                <CartProductItem cartItem={item}/>
                )} 
            showsHorizontalScrollIndicator={false}
        />

    </View>
  )
}

const styles = StyleSheet.create({
    page: {
        padding : 10,
    },
    
});

export default ShopCartScreen;