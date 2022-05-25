import { View, Text , Pressable, StyleSheet} from 'react-native'
import React from 'react'

const QuantitySelector = ({quantity, setQuantity}) => {
    const onMinus = () => {
        setQuantity(Math.max(0,quantity -1));
    }
    const onPlus = () => {
        setQuantity(quantity +1);
    }
  return (
    <View style={styles.root}>
        
        <Pressable style={styles.button} onPress={onMinus}>
            <Text style={styles.buttonText}>-</Text>
        </Pressable>

      <Text style={styles.quantity}> {quantity}</Text>

      <Pressable style={styles.button} onPress={onPlus}>
            <Text style={styles.buttonText}>+</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    root : {
        flexDirection : "row",
        borderWidth : 1,
        borderColor : "#e3e3e3",
        alignItems : "center",
        width: 150,
        height : 50,
        justifyContent : "space-between",
        margin : 5,
    },
    button : {
        width : 50,
        height : 50,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : "#d1d1d1",
    },
    buttonText : {
        fontSize : 18,
    },
    quantity : {
        color : "#007eb9",
    }

})

export default QuantitySelector;