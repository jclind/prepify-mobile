import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import sv from '../../../../config/sv'

type AddRecipeInputType = {
  val: string
  setVal: (val) => void
}

export default function AddRecipeInput({ val, setVal }) {
  return (
    <View>
      <TextInput
        value={val}
        onChangeText={text => setVal(text)}
        style={styles.input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: sv.inputBorderColor,
    borderRadius: sv.borderRadius,
  },
})
