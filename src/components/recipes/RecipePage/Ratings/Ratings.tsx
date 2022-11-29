import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import recipeStyles from '../../../../config/recipeStyles'
import SectionTitle from '../SectionTitle'
import RecipeType from '../../../../config/types/Recipe'

import RatingsHeader from './RatingsHeader'
import ReviewsList from './ReviewsList'

type RatingsProps = {
  recipe: RecipeType
}

export default function Ratings({ recipe }: RatingsProps) {
  const averageRating =
    Number(recipe.rating.rateValue) / Number(recipe.rating.rateCount)

  return (
    <View style={recipeStyles.sectionContainer}>
      <SectionTitle>Ratings & Reviews</SectionTitle>
      <RatingsHeader
        averageRating={averageRating}
        rateCount={Number(recipe.rating.rateCount)}
      />
      <ReviewsList recipe={recipe} />
    </View>
  )
}

const styles = StyleSheet.create({})
