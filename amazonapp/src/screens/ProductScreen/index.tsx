import { View, Text, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { useRoute } from '@react-navigation/native'
import styles from './styles'
import products from '../../data/product'
import {Picker} from "@react-native-picker/picker"
import QuantitySelector from '../../components/quantitySelector'
import Button from '../../components/Button'
import ImageCarousel from '../../components/ImageCarousel'


const ProductScreen = () => {
    const [selected, setselected] = useState(products.options ? products.options[0] : null);
    const [quantity, setQuantity] = useState(1);
    console.log(selected);
    const route = useRoute();
    console.log(route.params);

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{products.title}</Text>
      {/* image carousel */}
        <ImageCarousel images={products.images}> </ImageCarousel>

      {/* option selector */}
        <Picker
            selectedValue = {selected}
            onValueChange = {(itemValue, itemIndex) => setselected(itemValue)}
            >
                {products.options.map(option =>(
                    <Picker.Item label={option} value={option} />
                ))}
        </Picker>


      {/* price */}
      <Text style={styles.price}>from ${products.price}
                {products.oldPrice && (<Text style={styles.oldprice}>${products.oldPrice}</Text>)}
            </Text>

      {/* description */}
      <Text style = {styles.description}>
          {products.description}
      </Text>


      {/* quantity selector */}
      <QuantitySelector quantity = {quantity} setQuantity = {setQuantity}/>

      {/* Button */}
      <Button text={"Add to Cart"} onPress={() => {console.warn("added")}} containerStyle = {{backgroudColor :"#e3c905"}}></Button>
      <Button text={"Buy Now"} onPress={() => {console.warn("bought")}}></Button>
    </ScrollView>
  )
}

export default ProductScreen