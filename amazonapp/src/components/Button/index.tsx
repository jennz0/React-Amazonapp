import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

interface ButtonProps {
    text: string;
    onPress: () => void;
    containerStyle ?: object;
}

const Button = ({text, onPress, containerStyle} : ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.root, containerStyle]}>
      <Text style = {styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    root : {
        backgroundColor : "#e47911",
        margin : 10,
        height : 35,
        alignItems : "center",
        justifyContent : "center",
        borderRadius : 8,
        borderWidth : 2,
        borderColor : "#a15e1b",
    },
    text: {
        fontSize : 15,
    }
})
export default Button