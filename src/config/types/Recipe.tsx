type RecipeType = {
  _id: string
  title: string
  prepTime: string
  cookTime: string
  additionalTime: string
  yield: {
    type: {
      value: string
      label: string
    }
    value: string
  }
  fridgeLife: string | null
  freezerLife: string | null
  description: string | null
  instructions: {
    name: string
    list: {
      context: string
      index: {
        [key: string]: string
      }
      id: string
    }[]
  }[]
  ingredients: {
    name: string
    list: {
      quantity: string
      id: string
      measurement: {
        value: string
        label: string
      }
      name: string
      price: string
    }[]
  }[]
  recipeImage: string
  tags: string[]
  nutritionData: any
  totalTime: string
  authorId: string
  rating: {
    rateCount: string
    rateValue: string
  }
  createdAt: string
  editedAt: string | null
  servingPrice: string
  averageRating: {
    [key: string]: string
  }
}

export default RecipeType
