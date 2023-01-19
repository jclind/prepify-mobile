import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AddRecipeInput from './AddRecipeInput'

export default function AddRecipeIngredientInput() {
  const [inputVal, setInputVal] = useState('')

  return (
    <View>
      <AddRecipeInput val={inputVal} setVal={setInputVal} />
    </View>
  )
}

const styles = StyleSheet.create({})
