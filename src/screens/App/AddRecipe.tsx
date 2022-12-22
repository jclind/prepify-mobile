import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import AddRecipeInputTitle from '../../components/recipes/RecipePage/AddRecipe/AddRecipeInputTitle'
import Screen from '../../components/layout/Screen'
import AddRecipeInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeInput'
import AddRecipeImageInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeImageInput.tsx'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AppText from '../../components/text/AppText'
import AddRecipeYieldInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeServingsInput'
import AddRecipeServingsInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeServingsInput'

export default function AddRecipe() {
  const [title, setTitle] = useState('')

  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [servings, setServings] = useState(null)

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
      <View style={styles.inputSection}>
        <AddRecipeInputTitle title='Description' />
        <AddRecipeInput
          val={description}
          setVal={setDescription}
          numberOfLines={5}
        />
      </View>
      <View style={styles.inputSection}>
        <AddRecipeInputTitle title='Servings' />
        <AddRecipeServingsInput servings={servings} setServings={setServings} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  inputSection: {
    marginBottom: 25,
    paddingTop: 10,
  },
})
