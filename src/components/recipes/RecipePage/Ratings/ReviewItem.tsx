import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReviewType from '../../../../config/types/Review'
import sv from '../../../../config/sv'
import AppText from '../../../text/AppText'
import RecipeAPI from '../../../../api/recipes'

type ReviewItemProps = {
  review: ReviewType
}

export default function ReviewItem({ review }: ReviewItemProps) {
  RecipeAPI.getRecipe('iv9mhGb5BEMlzytQBTCq7nzxwmC3')
  return (
    <View style={styles.reviewItem}>
      <AppText size='mediumSmall'>{review.reviewText}</AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  reviewItem: {
    width: '100%',
    backgroundColor: sv.secondaryBackground,
    padding: 15,
    borderRadius: sv.borderRadius,
  },
})
