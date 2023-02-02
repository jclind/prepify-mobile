import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { IngredientResponseType } from '@jclind/ingredient-parser/'
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
  const addIngredient = (data: IngredientsType) => {
    const ingredientData = { ...data, id: uuid.v4() }
    setIngredients(prev => [...prev, ingredientData])
  }

  const renderItem = ({ item, drag, isActive }) => {
    const { imagePath } = item?.ingredientData ?? {}
    const { comment, ingredient, quantity, unit } = item?.parsedIngredient ?? {}
    return (
      <ScaleDecorator>
        <TouchableOpacity onLongPress={drag} disabled={isActive}>
          {item.label ? (
            <View style={styles.ingredientLabel} key={item.id}>
              <AppText size='mediumSmall' style={styles.labelText}>
                {item.label}
              </AppText>
            </View>
          ) : (
            <AddRecipeIngredientItem
              key={item.id}
              id={item.id}
              comment={comment}
              name={ingredient}
              imagePath={imagePath}
              quantity={quantity}
              unit={unit}
              removeIngredient={removeIngredient}
            />
          )}
        </TouchableOpacity>
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
        addIngredient={addIngredient}
      />
      <View style={styles.ingredientList}>
        <DraggableFlatList
          data={ingredients}
          onDragEnd={({ data }) => setIngredients(data)}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          onScrollOffsetChange={() => Haptics.selectionAsync()}
          onPlaceholderIndexChange={() => Haptics.selectionAsync()}
          onDragBegin={() => Haptics.selectionAsync()}
        />
      </View>
      <AddLabelContainer
        labelVal={labelVal}
        setLabelVal={setLabelVal}
        addToList={addIngredient}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  ingredientList: {
    paddingTop: 15,
  },
  ingredientLabel: {
    paddingVertical: 20,
  },
  labelText: {
    fontFamily: 'Montserrat_700Bold',
  },
})
