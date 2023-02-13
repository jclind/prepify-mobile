import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import recipeStyles from '../../../../config/recipeStyles'
import SectionTitle from '../SectionTitle'
import RecipeType from '../../../../config/types/Recipe'

import RatingsHeader from './RatingsHeader'
import ReviewsList from './ReviewsList'

type RatingsProps = {
  recipeID: string
  rating: { rateCount: number; rateValue: number }
}

export default function Ratings({ recipeID, rating }: RatingsProps) {
  const averageRating =
    rating.rateCount > 0 ? rating.rateValue / rating.rateCount : 0

  return (
    <View style={recipeStyles.sectionContainer}>
      <SectionTitle>Ratings & Reviews</SectionTitle>
      <RatingsHeader
        averageRating={averageRating}
        rateCount={rating.rateCount}
      />
      <ReviewsList recipeID={recipeID} />
    </View>
  )
}

const styles = StyleSheet.create({})
