import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    page: {
        padding : 10,
    },
    root: {
        flexDirection: 'row',
        borderWidth : 2,
        borderColor : '#d1d1d1',
        borderRadius : 10,
        backgroundColor : '#fff',
        width : '100%',
        marginVertical : 5,
    },
    image: {
        flex: 2,
        height : 180,
        resizeMode : "contain"
    },
    rightContainer : {
        padding : 10,
        width : '100%',
        flex: 3
    },
    title: {
        width : '100%',
        fontSize : 18,
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
    ratings : {
        flexDirection : 'row',
        alignItems : 'center',
        marginVertical : 5,
    },
    star: {
        margin : 2,
    }
});

export default styles;