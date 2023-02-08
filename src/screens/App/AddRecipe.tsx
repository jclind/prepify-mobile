import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
} from 'react-native'
import Constants from 'expo-constants'
import React, { useEffect, useRef, useState } from 'react'

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
import Button from '../../components/Button'
import AddRecipeFormError from '../../components/recipes/RecipePage/AddRecipe/AddRecipeFormError'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type ErrorsType = {
  title: string
  image: string
  description: string
  servings: string
  prepTime: string
  cookTime: string
  ingredients: string
  instructions: string
  cuisine: string
  course: string
}

export default function AddRecipe() {
  const [title, setTitle] = useState('')

  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [servings, setServings] = useState(null)

  const [prepTime, setPrepTime] = useState<{
    hours: number
    minutes: number
  } | null>(null)
  const [cookTime, setCookTime] = useState<{
    hours: number
    minutes: number
  } | null>(null)

  const [ingredients, setIngredients] = useState<IngredientsType[]>([])
  const [instructions, setInstructions] = useState<InstructionsType[]>([])

  const [cuisine, setCuisine] = useState('')
  const [course, setCourse] = useState('')

  const [errors, setErrors] = useState<Partial<ErrorsType>>({})

  const addRecipeFormRef = useRef(null)

  const validate = () => {
    let newErrors: Partial<ErrorsType> = {}

    if (!title) {
      newErrors.title = 'Title is required'
    } else if (title.length > 50) {
      newErrors.title = 'Title cannot exceed 50 characters'
    }

    if (!image) newErrors.image = 'Image is required'
    if (!description) newErrors.description = 'Description is required'
    if (!servings) newErrors.servings = 'Servings amount is required'
    if (!prepTime) newErrors.prepTime = 'Prep time is required'
    if (ingredients.length <= 0)
      newErrors.ingredients = 'Recipe must contain ingredients'
    if (instructions.length <= 0)
      newErrors.instructions = 'Instructions are required'
    if (!cuisine) newErrors.cuisine = 'Cuisine required'
    if (!course) newErrors.course = 'Course required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleAddRecipe = () => {
    if (validate()) {
      console.log('success')
    } else {
      if (addRecipeFormRef.current) {
        addRecipeFormRef.current.scrollToOffset({ offset: 0, animated: true })
      }
      console.log('Errors')
    }
  }

  const ListFooterComponent = () => (
    <KeyboardAwareScrollView keyboardOpeningTime={0}>
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
            <AddRecipeFormError error={errors?.title} />
          </View>
          <View style={styles.inputSection}>
            <AddRecipeInputTitle title='Cover Image' />
            <AddRecipeImageInput image={image} setImage={setImage} />
            <AddRecipeFormError error={errors?.image} />
          </View>
          <View style={styles.inputSection}>
            <AddRecipeInputTitle title='Description' />
            <AddRecipeInput
              val={description}
              setVal={setDescription}
              numberOfLines={5}
            />
            <AddRecipeFormError error={errors?.description} />
          </View>
          <View style={styles.inputSection}>
            <View style={styles.row}>
              <AddRecipeInputTitle title='Servings' style={styles.flex} />
              <AddRecipeServingsInput
                servings={servings}
                setServings={setServings}
              />
            </View>
            <AddRecipeFormError error={errors?.servings} />
          </View>
          <View style={styles.inputSection}>
            <View style={styles.row}>
              <AddRecipeInputTitle title='Prep Time' style={styles.flex} />
              <AddRecipeTimeInput time={prepTime} setTime={setPrepTime} />
            </View>
            <AddRecipeFormError error={errors?.prepTime} />
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
            <AddRecipeFormError error={errors?.ingredients} style={styles.px} />
          </View>
          <View>
            <AddRecipeInputTitle title='Instructions' style={styles.px} />
            <InstructionsContainer
              instructions={instructions}
              setInstructions={setInstructions}
            />
            <AddRecipeFormError
              error={errors?.instructions}
              style={styles.px}
            />
          </View>
          <View style={styles.inputSection}>
            <View style={styles.row}>
              <AddRecipeInputTitle title='Cuisine' style={styles.flex} />
              <FormPicker
                items={cuisines}
                val={cuisine}
                setVal={setCuisine}
                title='Set Cuisine'
              />
            </View>
            <AddRecipeFormError error={errors?.cuisine} />
          </View>
          <View style={styles.inputSection}>
            <View style={styles.row}>
              <AddRecipeInputTitle title='Course Type' style={styles.flex} />
              <FormPicker
                items={courses}
                val={course}
                setVal={setCourse}
                title='Set Course Type'
              />
            </View>
            <AddRecipeFormError error={errors?.course} />
          </View>
        </View>
        <Button
          title='Add Recipe'
          onPress={handleAddRecipe}
          style={styles.addRecipeBtn}
        />
      </Pressable>
    </KeyboardAwareScrollView>
  )

  return (
    <View style={{ flex: 1, height: '100%', width: '100%' }}>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListFooterComponent={ListFooterComponent}
        keyboardShouldPersistTaps='always'
        ref={addRecipeFormRef}
      />
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
  addRecipeBtn: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
})
