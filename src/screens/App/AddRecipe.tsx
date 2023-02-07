import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
} from 'react-native'
import Constants from 'expo-constants'
import React, { useEffect, useState } from 'react'

import { FlatList } from 'react-native-gesture-handler'
import AddRecipeInputTitle from '../../components/recipes/RecipePage/AddRecipe/AddRecipeInputTitle'
import AddRecipeInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeInput'
import AddRecipeImageInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeImageInput'
import AddRecipeServingsInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeServingsInput'
import AddRecipeTimeInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeTimeInput'
import IngredientsContainer from '../../components/recipes/RecipePage/AddRecipe/IngredientsContainer'
import InstructionsContainer from '../../components/recipes/RecipePage/AddRecipe/InstructionsContainer'
import FormPicker from '../../components/recipes/RecipePage/AddRecipe/FormPicker'
import {
  IngredientsType,
  InstructionsType,
} from '../../components/recipes/RecipePage/AddRecipe/addRecipeTypes'

import cuisines from '../../recipeData/cuisines'
import courses from '../../recipeData/courses'

export default function AddRecipe() {
  const [title, setTitle] = useState('')

  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [servings, setServings] = useState(null)

  const [prepTime, setPrepTime] = useState(null)
  const [cookTime, setCookTime] = useState(null)

  const [ingredients, setIngredients] = useState<IngredientsType[]>([])
  const [instructions, setInstructions] = useState<InstructionsType[]>([])

  const [cuisine, setCuisine] = useState('')
  const [course, setCourse] = useState('')

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
        <View style={[styles.inputSection, styles.row]}>
          <AddRecipeInputTitle title='Cuisine' style={styles.flex} />
          <FormPicker
            items={cuisines}
            val={cuisine}
            setVal={setCuisine}
            title='Set Cuisine'
          />
        </View>
        <View style={[styles.inputSection, styles.row]}>
          <AddRecipeInputTitle title='Course Type' style={styles.flex} />
          <FormPicker
            items={courses}
            val={course}
            setVal={setCourse}
            title='Set Course Type'
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
    marginBottom: 30,
    paddingTop: 15,
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
