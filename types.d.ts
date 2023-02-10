import { IngredientResponseType } from '@jclind/ingredient-parser'

export type RecipeType = {
  _id: string
  title: string
  prepTime: number
  cookTime: number | null
  yield: number
  fridgeLife: number | null
  freezerLife: number | null
  description: string
  ingredients: IngredientsType[]
  instructions: InstructionsType[]
  // recipeImage:
}

export type LabelType = { label: string; id?: string }
export type IngredientsType = IngredientResponseType | LabelType
export type InstructionsType =
  | { content: string; index: number; id?: string }
  | LabelType
