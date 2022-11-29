type ReviewType = {
  _id: string
  rating: string
  ratingLastUpdated: string
  recipeId: string
  userId: string
  reviewCreatedAt?: string
  reviewLastUpdated?: string
  reviewText?: string
}

export default ReviewType
