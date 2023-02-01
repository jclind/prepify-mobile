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
  FlatList,
  SafeAreaView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { IngredientResponseType } from '@jclind/ingredient-parser/'
import AddRecipeInputTitle from '../../components/recipes/RecipePage/AddRecipe/AddRecipeInputTitle'
import Screen from '../../components/layout/Screen'
import AddRecipeInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeInput'
import AddRecipeImageInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeImageInput'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AppText from '../../components/text/AppText'
import AddRecipeServingsInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeServingsInput'
import AddRecipeTimeInput from '../../components/recipes/RecipePage/AddRecipe/AddRecipeTimeInput'
import Constants from 'expo-constants'
import IngredientsContainer from '../../components/recipes/RecipePage/AddRecipe/IngredientsContainer'

export default function AddRecipe() {
  const [title, setTitle] = useState('')

  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [servings, setServings] = useState(null)

  const [prepTime, setPrepTime] = useState(null)
  const [cookTime, setCookTime] = useState(null)

  const [ingredients, setIngredients] = useState<IngredientResponseType[]>([])

  useEffect(() => {
    console.log('HERE', ingredients)
  }, [ingredients])
  const ListFooterComponent = () => (
    <KeyboardAvoidingView
      behavior='position'
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      {/* <ScrollView keyboardShouldPersistTaps='always'> */}
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
          <IngredientsContainer
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  )

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListFooterComponent={ListFooterComponent}
        keyboardShouldPersistTaps='always'
      />
    </View>
  )

  return (
    <KeyboardAvoidingView
      behavior='position'
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      {/* <ScrollView keyboardShouldPersistTaps='always'> */}
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
          <IngredientsContainer
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
