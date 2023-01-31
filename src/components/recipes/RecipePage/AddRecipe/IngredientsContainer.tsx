import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { IngredientResponseType } from '@jclind/ingredient-parser/'
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

  return (
    <View>
      {error && <Error error={error} />}
      <AddRecipeIngredientInput
        setIngredients={setIngredients}
        error={error}
        setError={setError}
      />
      <View>
        {ingredients.length > 0 &&
          ingredients.map(ingr => {
            const { _id, imagePath } = ingr?.ingredientData ?? {}
            const { comment, ingredient, quantity, unit } =
              ingr?.parsedIngredient ?? {}
            return (
              <AddRecipeIngredientItem
                // key={_id}
                _id={_id}
                comment={comment}
                name={ingredient}
                imagePath={imagePath}
                quantity={quantity}
                unit={unit}
              />
            )
          })}
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
