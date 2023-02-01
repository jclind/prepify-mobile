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
import sv from '../../../../config/sv'
import Error from '../../../Error'

type IngredientsProps = {
  ingredients: IngredientResponseType[]
  setIngredients: (ingr) => void
}

export default function IngredientsContainer({
  ingredients,
  setIngredients,
}: IngredientsProps) {
  const [error, setError] = useState('')

  const removeIngredient = removeId => {
    setIngredients(prev => prev.filter(ingr => ingr.id !== removeId))
  }

  const renderItem = ({ item, drag, isActive }) => {
    const { imagePath } = item?.ingredientData ?? {}
    const { comment, ingredient, quantity, unit } = item?.parsedIngredient ?? {}
    return (
      <ScaleDecorator>
        <TouchableOpacity onLongPress={drag} disabled={isActive}>
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
      />
      <View>
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
    </View>
  )
}

const styles = StyleSheet.create({
  // error: {
  //   width: '100%',
  //   backgroundColor:
  //   color: sv.danger,
  //   paddingBottom: 5,
  // },
})
