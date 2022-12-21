import { Button, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import AddRecipeInputTitle from '../../components/recipes/RecipePage/AddRecipe/AddRecipeInputTitle'
import Screen from '../../components/layout/Screen'
import AddRecipeInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeInput'
import AddRecipeImageInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeImageInput.tsx'

export default function AddRecipe() {
  const [title, setTitle] = useState('')

  const [image, setImage] = useState(null)

  return (
    <Screen style={styles.container}>
      <View style={styles.inputSection}>
        <AddRecipeInputTitle title='Title' />
        <AddRecipeInput val={title} setVal={setTitle} />
      </View>
      <View style={styles.inputSection}>
        <AddRecipeInputTitle title='Cover Image' />
        <AddRecipeImageInput image={image} setImage={setImage} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  inputSection: {},
})
