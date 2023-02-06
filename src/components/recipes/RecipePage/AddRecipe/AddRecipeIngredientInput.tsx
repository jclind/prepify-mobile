import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'

import AddRecipeInput from './AddRecipeInput'
import AppText from '../../../text/AppText'
import sv from '../../../../config/sv'
import { IngredientResponseType } from '@jclind/ingredient-parser'
import { IngredientsType } from './addRecipeTypes'

type AddRecipeIngredientInputProps = {
  setIngredients: (ingredient) => void
  error: string
  setError: (string) => void
  getIngredientData: (val: string) => Promise<IngredientResponseType>
  addIngredientToList: (data: IngredientsType) => void
}

export default function AddRecipeIngredientInput({
  setIngredients,
  error,
  setError,
  getIngredientData,
  addIngredientToList,
}: AddRecipeIngredientInputProps) {
  const [inputVal, setInputVal] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddIngredient = async () => {
    setError('')
    console.log('here', loading, inputVal)
    if (loading || !inputVal) return

    setLoading(true)

    const data = await getIngredientData(inputVal)
    if (data) {
      addIngredientToList(data)
      setInputVal('')
      setLoading(false)
    } else {
      setLoading(false)
      setError('something went wrong')
    }

    // ingredientParser(inputVal, SPOONACULAR_API_KEY)
    //   .then(res => {
    //     addIngredient(res)
    //     setInputVal('')
    //     setLoading(false)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     setError(err)
    //     setLoading(false)
    //   })
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 15,
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
