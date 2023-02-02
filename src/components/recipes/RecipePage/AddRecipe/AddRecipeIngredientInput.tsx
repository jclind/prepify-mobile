import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import {
  ingredientParser,
  IngredientResponseType,
} from '@jclind/ingredient-parser'
import AddRecipeInput from './AddRecipeInput'
import AppText from '../../../text/AppText'
import sv from '../../../../config/sv'
import { SPOONACULAR_API_KEY } from '@env'
import { IngredientType } from '../../../../config/types/Recipe'

type AddRecipeIngredientInputProps = {
  setIngredients: (ingredient) => void
  error: string
  setError: (string) => void
  addIngredient: (IngredientType) => void
}

export default function AddRecipeIngredientInput({
  setIngredients,
  error,
  setError,
  addIngredient,
}: AddRecipeIngredientInputProps) {
  const [inputVal, setInputVal] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddIngredient = async () => {
    setError('')
    console.log('here', loading, inputVal)
    if (loading || !inputVal) return

    setLoading(true)

    ingredientParser(inputVal, SPOONACULAR_API_KEY)
      .then(res => {
        addIngredient(res)
        setInputVal('')
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(err)
        setLoading(false)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <AddRecipeInput
          val={inputVal}
          setVal={setInputVal}
          numberOfLines={2}
          onEnter={handleAddIngredient}
        />
      </View>
      {/* <TouchableOpacity style={styles.addBtn} onPress={handleAddIngredient}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <AppText size='mediumSmall'>Add</AppText>
        )}
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
  },
  inputContainer: { flex: 1 },
  addBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: sv.secondaryBackground,
    width: 75,
    borderRadius: sv.borderRadius,
    marginLeft: 5,
  },
})
