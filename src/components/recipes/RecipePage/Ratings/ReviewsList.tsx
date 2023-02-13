import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import ReviewType from '../../../../config/types/Review'
import RecipeAPI from '../../../../api/recipes'
import RecipeType from '../../../../config/types/Recipe'
import ReviewItem from './ReviewItem'

type ReviewsListProps = {
  recipeID: string
}

export default function ReviewsList({ recipeID }: ReviewsListProps) {
  const [reviews, setReviews] = useState<ReviewType[]>([])

  useEffect(() => {
    RecipeAPI.getRecipeReviews(null, recipeID).then(res => {
      setReviews(res.data.reviews)
    })
  }, [])
  return (
    <View style={styles.reviewsList}>
      {reviews.map(review => {
        if (!review.reviewText) return null
        return <ReviewItem key={review._id} review={review} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  reviewsList: {},
})
