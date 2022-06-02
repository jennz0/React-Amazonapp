import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './styles'
import {Picker} from "@react-native-picker/picker"
import QuantitySelector from '../../components/quantitySelector'
import Button from '../../components/Button'
import ImageCarousel from '../../components/ImageCarousel'
import { DataStore , Auth} from 'aws-amplify'
import { Product , CartProduct} from '../../models';
import { useNavigation ,useRoute} from '@react-navigation/native'


const ProductScreen = () => {
    const [selected, setselected] = useState<string | null>(null);//(products.options ? products.options[0] : null);
    const [quantity, setQuantity] = useState(1);
    const route = useRoute();
    const navigation = useNavigation();

    const [product, setProduct] = useState<Product | undefined>(undefined);
    useEffect(() => {
      if (!route.params?.id) {
        return
      }
      DataStore.query(Product, route.params.id).then(setProduct)
    }, [route.params?.id]);

    useEffect(() => {
      if (product?.options) {
        setselected(product.options[0]);
      }
    }, [product]);
    if (!product) {
      return <ActivityIndicator />
    }

    const onAddToCart = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      if (!product || !userData) {
        return;
      }
      const newCartProduct = new CartProduct({
        userSub : userData.attributes.sub,
        quantity,
        option: selected || null,
        productID : product.id,
      })

      await DataStore.save(newCartProduct);
      navigation.navigate('ShopCart');
    }
  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>
      {/* image carousel */}
        <ImageCarousel images={product.images}> </ImageCarousel>

      {/* option selector */}
        <Picker
            selectedValue = {selected}
            onValueChange = {(itemValue, itemIndex) => setselected(itemValue)}
            >
                {product.options.map(option =>(
                    <Picker.Item label={option} value={option} />
                ))}
        </Picker>


      {/* price */}
      <Text style={styles.price}>from ${product.price.toFixed(2)}
                {product.oldPrice && (<Text style={styles.oldprice}>${product.oldPrice?.toFixed(2)}</Text>)}
            </Text>

      {/* description */}
      <Text style = {styles.description}>
          {product.description}
      </Text>


      {/* quantity selector */}
      <QuantitySelector quantity = {quantity} setQuantity = {setQuantity}/>

      {/* Button */}
      <Button text={"Add to Cart"} 
              onPress={onAddToCart} 
              containerStyle = {{backgroudColor :"yellow"}}></Button>
      <Button text={"Buy Now"} onPress={() => {console.warn("bought")}}></Button>
    </ScrollView>
  )
}

export default ProductScreen