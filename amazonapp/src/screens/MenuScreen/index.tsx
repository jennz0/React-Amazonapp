import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import {Auth} from 'aws-amplify'

const MenuScreen = () => {
    const onLogOut = () => {
        Auth.signOut();
    }

  return (
    <SafeAreaView>
      {/* <Pressable onPress={onLogOut}>
          <Text>Sign Out</Text>
      </Pressable> */}
      <Button text='Sign Out' onPress={onLogOut}></Button>
    </SafeAreaView>
  )
}

export default MenuScreen