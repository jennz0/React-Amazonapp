import { View, Text, FlatList, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'

const ImageCarousel = ({images} : {images: [string]}) => {
    const windowWidth = useWindowDimensions().width;
    const [activeIndex, setActiveIndex] = useState(0);
  return (
    <View style={styles.root}>
        <FlatList 
            data = {images}
            renderItem = {({item}) => 
                (<Image style = {[styles.image, {width: windowWidth - 40}]} 
                        source = {{uri : item}}></Image>)} 
            horizontal
            showsHorizontalScrollIndicator = {false}
            snapToAlignment = {"center"}
            snapToInterval = {windowWidth - 20}
            decelerationRate = {"fast"}
            viewabilityConfig = {{viewAreaCoveragePercentThreshold : 50}}
            onViewableItemsChanged = {({viewableItem}) => {console.log(viewableItem);}}/>
        
        <View style = {styles.dots}>
            {images.map((image, index) => 
                (<View style={[styles.dot, {backgroundColor : index == activeIndex ? "#c9c9c9" : "#fff"}]} />))}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    root : {

    },
    dots : {
        flexDirection : "row",
        justifyContent : "center",
    },
    dot : {
        width : 10,
        height : 10,
        borderRadius : 25,
        borderColor : "#c9c9c9",
        borderWidth : 2,
        margin : 5,
        backgroundColor : "#ededed",
    },
    image : {
        margin : 10,
        width : 150,
        height : 240,
        resizeMode : "contain",
        
    },
})
export default ImageCarousel