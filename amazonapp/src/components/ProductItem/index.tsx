import { View, Text, Image , Pressable} from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'

interface ProductItemProps {
    item: {
        id: string,
        title: string,
        image: string,
        avgRating: number,
        ratings: number,
        price: number,
        oldPrice?: number,
    }
}

const ProductItem = (props:ProductItemProps) => {
    const item = props.item;
    const navigation = useNavigation();
    const onPress = () => {
      navigation.navigate('ProductDetails', {id : item.id});
    }

  return (
    <View style={styles.page}>
      <Pressable onPress={onPress} style={styles.root}>
        <Image style = {styles.image} source = {{uri : item.image}}/>
        <View style = {styles.rightContainer}>
            <Text style={styles.title} numberOfLines = {3}>{item.title}</Text>
            {/*ratings */}
            <View style = {styles.ratings}>
                {[0,0,0,0,0].map((el, i) =><FontAwesome
                                            key = {`${item.id}-${i}`}
                                            name = {i < Math.floor(item.avgRating) ? "star" : "star-o"} 
                                            style={styles.star} size = {18} 
                                            color = {'#e47911'}></FontAwesome>)}
                {/* <FontAwesome name = "star" style={styles.star} size = {18} color = {'#e47911'}></FontAwesome>
                <FontAwesome name = "star" style={styles.star} size = {18} color = {'#e47911'}></FontAwesome>
                <FontAwesome name = "star" style={styles.star} size = {18} color = {'#e47911'}></FontAwesome>
                <FontAwesome name = "star-half-full" style={styles.star} size = {18} color = {'#e47911'}></FontAwesome>
                <FontAwesome name = "star-o" style={styles.star} size = {18} color = {'#e47911'}></FontAwesome> */}
                <Text>13,032</Text>
            </View>
            <Text style={styles.price}>from ${item.price.toFixed(2)}
                {item.oldPrice && (<Text style={styles.oldprice}>${item.oldPrice.toFixed(2)}</Text>)}
            </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default ProductItem