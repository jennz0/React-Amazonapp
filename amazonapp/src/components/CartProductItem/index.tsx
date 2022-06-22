import { View, Text, Image } from 'react-native'
import React , {useState} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import QuantitySelector from '../../components/quantitySelector'


import {DataStore, Auth} from 'aws-amplify';

import {CartProduct, Product} from '../../models';

interface CartProductItemProps {
  cartItem: Product;
}

const CartProductItem = ({cartItem}:CartProductItemProps) => {
  
    const {product, ...cartProduct} = cartItem
    //const [quantity, setQuantity] = useState(quantityProp)

    const updateQuantity = async (newQuantity : number) => {
      const original = await DataStore.query(CartProduct, cartProduct.id);

      await DataStore.save(
        CartProduct.copyOf(original, updated => {
          updated.quantity = newQuantity;
        })
      );
    };

  return (
    <View style={styles.page}>
      <View style={styles.root}>
        <Image style = {styles.image} source = {{uri : product.image}}/>
        <View style = {styles.rightContainer}>
            <Text style={styles.title} numberOfLines = {3}>{product.title}</Text>
            {/*ratings */}
            <View style = {styles.ratings}>
                {[0,0,0,0,0].map((el, i) =><FontAwesome
                                            key = {`${product.id}-${i}`}
                                            name = {i < Math.floor(product.avgRating) ? "star" : "star-o"} 
                                            style={styles.star} size = {18} 
                                            color = {'#e47911'}></FontAwesome>)}
                {/* <FontAwesome name = "star" style={styles.star} size = {18} color = {'#e47911'}></FontAwesome>
                <FontAwesome name = "star" style={styles.star} size = {18} color = {'#e47911'}></FontAwesome>
                <FontAwesome name = "star" style={styles.star} size = {18} color = {'#e47911'}></FontAwesome>
                <FontAwesome name = "star-half-full" style={styles.star} size = {18} color = {'#e47911'}></FontAwesome>
                <FontAwesome name = "star-o" style={styles.star} size = {18} color = {'#e47911'}></FontAwesome> */}
                <Text>13,032</Text>
            </View>
            <Text style={styles.price}>from ${product.price.toFixed(2)}
                {product.oldPrice && (<Text style={styles.oldprice}>${product.oldPrice.toFixed(2)}</Text>)}
            </Text>
            <QuantitySelector quantity={cartProduct.quantity} setQuantity = {updateQuantity} />
        </View>

      </View>
    </View>
  )
}

export default CartProductItem