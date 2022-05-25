import { View, Text, TextInput, Alert , Platform, ScrollView, KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import countryList from 'country-list'
import { Picker } from '@react-native-picker/picker'
import Button from '../../components/Button'

const countries = countryList.getData();

const AddressScreen = () => {

    const [country, setCountry] = useState(countries[0].code)
    const [fullName, setFullName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [addressError, setAddressError] = useState("Invalid Address");
    const [state, setState] = useState({country : '', fullName: ''});

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