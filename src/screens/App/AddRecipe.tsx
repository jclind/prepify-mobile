import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Pressable,
  Keyboard,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { IngredientResponseType } from '@jclind/ingredient-parser/'
import AddRecipeInputTitle from '../../components/recipes/RecipePage/AddRecipe/AddRecipeInputTitle'
import Screen from '../../components/layout/Screen'
import AddRecipeInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeInput'
import AddRecipeImageInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeImageInput'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import AppText from '../../components/text/AppText'
import AddRecipeServingsInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeServingsInput'
import AddRecipeTimeInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeTimeInput'
import Constants from 'expo-constants'
import IngredientsContainer from '../../components/recipes/RecipePage/AddRecipe/IngredientsContainer'
import InstructionsContainer from '../../components/recipes/RecipePage/AddRecipe/InstructionsContainer'
import {
  IngredientsType,
  InstructionsType,
} from '../../components/recipes/RecipePage/AddRecipe/addRecipeTypes'

export default function AddRecipe() {
  const [title, setTitle] = useState('')

  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [servings, setServings] = useState(null)

  const [prepTime, setPrepTime] = useState(null)
  const [cookTime, setCookTime] = useState(null)

  const [ingredients, setIngredients] = useState<IngredientsType[]>([])
  const [instructions, setInstructions] = useState<InstructionsType[]>([])

  useEffect(() => {
    ingredients.map(i => console.log(i.id))
  }, [ingredients])
  const ListFooterComponent = () => (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
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
        <View>
          <AddRecipeInputTitle title='Ingredients' style={styles.px} />
          <IngredientsContainer
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        </View>
        <View>
          <AddRecipeInputTitle title='Instructions' style={styles.px} />
          <InstructionsContainer
            instructions={instructions}
            setInstructions={setInstructions}
          />
        </View>
      </View>
    </Pressable>
  )

  return (
    <View style={{ flex: 1, height: '100%', width: '100%' }}>
      <KeyboardAvoidingView
        behavior='position'
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}
      >
        <FlatList
          data={[]}
          renderItem={() => null}
          ListFooterComponent={ListFooterComponent}
          keyboardShouldPersistTaps='always'
        />
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  inputSection: {
    marginBottom: 25,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  px: {
    paddingHorizontal: 15,
  },
})
