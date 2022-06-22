import { View, Text, TextInput, Alert , Platform, ScrollView, KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import countryList from 'country-list'
import { Picker } from '@react-native-picker/picker'
import Button from '../../components/Button'
import { DataStore, Auth } from 'aws-amplify'
import {Order, OrderProduct, CartProduct} from '../../models'
import { NavigationContainer, useNavigation} from '@react-navigation/native'

const countries = countryList.getData();

const AddressScreen = () => {

    const [country, setCountry] = useState(countries[0].code)
    const [fullName, setFullName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [addressError, setAddressError] = useState("Invalid Address");
    const [state, setState] = useState({country : '', fullName: ''});
    const navigation = useNavigation();


    const saveOrder =async () => {
        //create a new order
        const userData = await Auth.currentAuthenticatedUser();


        const newOrder = await DataStore.save(
            new Order({
                userSub: userData.attributes.sub,

                fullName: fullName,
                phoneNumber: phoneNum,
                country: country,
                city: city,
                address: address,
            })
        )

        //fetch all cart items
        const cartItems = await DataStore.query(CartProduct, cp =>
            cp.userSub('eq', userData.attributes.sub));

        //attach all cart items to the order
        await Promise.all(
            cartItems.map(cartItems => DataStore.save(new OrderProduct({
                quantity : cartItems.quantity,
                option : cartItems.option,
                productID : cartItems.productID,
                orderID : newOrder.id,
            })))
        )

        // delete all cart items
        await Promise.all(cartItems.map(cartItem => DataStore.delete(cartItem)));

        //redirect home
        navigation.navigate('Home');
    };

    const onCheckout = () => {
        if (!!addressError) {
            Alert.alert("Please check all fields")
            return
        }
        if (!fullName) {
            Alert.alert("Please enter valid name")
            return
        }
        if (!phoneNum) {
            Alert.alert("Please enter valid Phone Number")
            return
        }

        console.warn("checkout succeeded")
        saveOrder();
    }

    console.log(address);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset = {Platform.OS === 'ios' ? 30 : 0}>
        <ScrollView style = {styles.root}>
            <View style={styles.row}>
                <Picker selectedValue={country} onValueChange={setCountry}>
                    {countries.map(country => <Picker.Item value={country.code} label={country.name} />)}
                </Picker>
            </View>
            
            
            <View style = {styles.row}>
                <Text style = {styles.label}>
                    Full Name
                </Text>
                <TextInput style ={styles.input} placeholder="Full Name" value={fullName} onChangeText = {setFullName}/>
            </View>
            
            
            <View style = {styles.row}>
                <Text style = {styles.label}>
                    Phone Number
                </Text>
                <TextInput style ={styles.input} 
                            placeholder="Phone Number" 
                            value={phoneNum} 
                            onChangeText = {setPhoneNum}
                            keyboardType = {'phone-pad'} />
            </View>
            
            
            <View style = {styles.row}>
                <Text style = {styles.label}>
                    Address
                </Text>
                <TextInput style ={styles.input} 
                            placeholder="Street Address" 
                            value={address} 
                            onChangeText = {(text) => {setAddress(text); setAddressError("")}}/>
                {!!addressError && (<Text style = {styles.errorLabel}>{addressError}</Text>)}
            </View>
            
            
            <View style = {styles.row}>
                <Text style = {styles.label}>
                    City
                </Text>
                <TextInput style ={styles.input} placeholder="City" value={city} onChangeText = {setCity}/>
            </View>
            <Button text='Checkout' onPress={onCheckout}/>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AddressScreen