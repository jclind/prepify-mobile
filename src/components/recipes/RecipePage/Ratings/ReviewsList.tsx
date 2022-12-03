import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import ReviewType from '../../../../config/types/Review'
import RecipeAPI from '../../../../api/recipes'
import RecipeType from '../../../../config/types/Recipe'
import ReviewItem from './ReviewItem'

type ReviewsListProps = {
  recipe: RecipeType
}

export default function ReviewsList({ recipe }: ReviewsListProps) {
  const [reviews, setReviews] = useState<ReviewType[]>([])

  useEffect(() => {
    RecipeAPI.getRecipeReviews(null, recipe._id).then(res => {
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
