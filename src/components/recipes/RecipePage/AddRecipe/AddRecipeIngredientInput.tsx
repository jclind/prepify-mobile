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

type AddRecipeIngredientInputProps = {
  setIngredients: (ingredient) => void
  error: string
  setError: (string) => void
}

export default function AddRecipeIngredientInput({
  setIngredients,
  error,
  setError,
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
        setIngredients(prev => [...prev, res])
        setInputVal('')
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <AddRecipeInput val={inputVal} setVal={setInputVal} numberOfLines={2} />
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={handleAddIngredient}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <AppText size='mediumSmall'>Add</AppText>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
