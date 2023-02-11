import { IngredientResponseType } from '@jclind/ingredient-parser'

export type RecipeType = {
  _id: string
  title: string
  prepTime: number
  cookTime: number | null
  servings: number
  fridgeLife: number | null
  freezerLife: number | null
  description: string
  ingredients: IngredientsType[]
  instructions: InstructionsType[]
  recipeImage: string
  nutritionData: any
  totalTime: number
  authorId: string
  rating: {
    rateCount: number
    rateValue: number
  }
  createdAt: string
  editedAt: null | string
  servingPrice: number | null
  cuisine: string
  course: string
}

export type LabelType = { label: string; id?: string }
export type IngredientsType = IngredientResponseType | LabelType
export type InstructionsType =
  | { content: string; index: number; id?: string }
  | LabelType
