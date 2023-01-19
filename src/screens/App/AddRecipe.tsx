import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Alert,
  ScrollView,
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
import AddRecipePrepTimeInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeTimeInput'
import AddRecipeTimeInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeTimeInput'
import AddRecipeIngredientInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeIngredientInput'
import Constants from 'expo-constants'

export default function AddRecipe() {
  const [title, setTitle] = useState('')

  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [servings, setServings] = useState(null)

  const [prepTime, setPrepTime] = useState(null)
  const [cookTime, setCookTime] = useState(null)

  return (
    <ScrollView>
      <View style={styles.container}>
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
        <View style={[styles.inputSection, styles.row]}>
          <AddRecipeInputTitle title='Servings' style={styles.flex} />
          <AddRecipeServingsInput
            servings={servings}
            setServings={setServings}
          />
        </View>
        <View style={[styles.inputSection, styles.row]}>
          <AddRecipeInputTitle title='Prep Time' style={styles.flex} />
          <AddRecipeTimeInput time={prepTime} setTime={setPrepTime} />
        </View>
        <View style={[styles.inputSection, styles.row]}>
          <AddRecipeInputTitle title='Cook Time' style={styles.flex} />
          <AddRecipeTimeInput time={cookTime} setTime={setCookTime} />
        </View>
        <View style={styles.inputSection}>
          <AddRecipeInputTitle title='Ingredients' />
          <AddRecipeIngredientInput />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
  },
  inputSection: {
    marginBottom: 25,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
})
