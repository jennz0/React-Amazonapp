import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root : {
        padding : 10,
        backgroundColor : "white",
    },
    price: {
        fontSize : 18,
        fontWeight: 'bold',
    },
    oldprice: {
        fontSize : 13,
        fontWeight: 'normal',
        textDecorationLine: "line-through"
    },
    description : {
        marginVertical : 10,
        lineHeight : 20,
    },
    title : {
        fontSize : 20,
        padding : 5,
    },
})

export default styles;