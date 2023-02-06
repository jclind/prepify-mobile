import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {
  ingredientParser,
  IngredientResponseType,
} from '@jclind/ingredient-parser/'
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist'
import * as Haptics from 'expo-haptics'
import AddRecipeIngredientInput from './AddRecipeIngredientInput'
import AddRecipeIngredientItem from './AddRecipeIngredientItem'
import AppText from '../../../text/AppText'
import uuid from 'react-native-uuid'
import sv from '../../../../config/sv'
import Error from '../../../Error'
import { MCIcons } from '../../../../config/types/MCIcons'
import AddRecipeInput from './AddRecipeInput'
import AddLabelContainer from './AddLabelContainer'
import { IngredientsType } from './addRecipeTypes'
import { SPOONACULAR_API_KEY } from '@env'

type IngredientsProps = {
  ingredients: IngredientsType[]
  setIngredients: (ingr) => void
}

export default function IngredientsContainer({
  ingredients,
  setIngredients,
}: IngredientsProps) {
  const [error, setError] = useState('')
  const [labelVal, setLabelVal] = useState('')

  const removeIngredient = removeId => {
    setIngredients(prev => prev.filter(ingr => ingr.id !== removeId))
  }
  const addIngredientToList = (data: IngredientsType) => {
    const ingredientData = { ...data, id: uuid.v4() }
    setIngredients(prev => [...prev, ingredientData])
  }
  const getIngredientData = async (val: string) => {
    const result = await ingredientParser(val, SPOONACULAR_API_KEY)

    return result
  }

  const editIngredient = (id: string, updatedItem: IngredientsType) => {
    setIngredients(prev =>
      prev.map(instr => (instr.id === id ? { ...updatedItem, id } : instr))
    )
  }

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <AddRecipeIngredientItem
          ingr={item}
          removeIngredient={removeIngredient}
          drag={drag}
          isActive={isActive}
          editIngredient={editIngredient}
          getIngredientData={getIngredientData}
        />
      </ScaleDecorator>
    )
  }

  return (
    <View>
      {error && <Error error={error} />}
      <AddRecipeIngredientInput
        setIngredients={setIngredients}
        error={error}
        setError={setError}
        getIngredientData={getIngredientData}
        addIngredientToList={addIngredientToList}
      />
      <View style={styles.ingredientList}>
        <DraggableFlatList
          data={ingredients}
          onDragEnd={({ data }) => setIngredients(data)}
          listKey={uuid.v4().toString()}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          onScrollOffsetChange={() => Haptics.selectionAsync()}
          onPlaceholderIndexChange={() => Haptics.selectionAsync()}
          onDragBegin={() => Haptics.selectionAsync()}
        />
      </View>
      <View style={styles.mx}>
        <AddLabelContainer
          labelVal={labelVal}
          setLabelVal={setLabelVal}
          addToList={addIngredientToList}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mx: {
    marginHorizontal: 15,
  },
  ingredientList: {
    paddingTop: 15,
  },
})
