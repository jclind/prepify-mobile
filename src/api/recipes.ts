import { doc, getDoc } from 'firebase/firestore'
import { db, storage } from './firebase'
import { http, nutrition } from './http-common'
import ingredientParser from '@jclind/ingredient-parser'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { IngredientsType, NutritionDataType, RecipeType } from '../../types'
import { calculateServingPrice } from './util'
import { EDAMAM_APP_ID, EDAMAM_APP_KEY } from '@env'
import ObjectID from 'bson-objectid'
import AuthAPI from './auth'
import dietLabels from '../recipeData/dietLabels'

class RecipeAPIClass {
  async getTrendingRecipes(limit: number = 4) {
    return await http.get(`getTrendingRecipes?limit=${limit}`)
  }
  async getRecipe(recipeId: string) {
    return await http.get(`getRecipe?id=${recipeId}`)
  }
  async getRecipeReviews(
    userId: string | null,
    recipeId: string,
    filter = 'new',
    page = 0,
    reviewsPerPage = 5
  ) {
    return await http.get(
      `getReviews?userId=${userId}&recipeId=${recipeId}&page=${page}&reviewsPerPage=${reviewsPerPage}&filter=${filter}`
    )
  }
  async likeReview(reviewId: string, userId: string) {
    return await http.get(`likeReview?reviewId=${reviewId}&userId=${userId}`)
  }
  async getUsername(userId: string) {
    const usernamesRef = doc(db, 'username', userId)
    const usernamesSnap = await getDoc(usernamesRef)

    if (usernamesSnap.exists()) {
      const currUsername = usernamesSnap.data().username
      return currUsername
    } else {
      return null
    }
  }
  async getRecipeTags(limit = 5) {
    return await http.get(`getRecipeTags?limit=${limit}`)
  }

  async searchAutoComplete(title = '', tags) {
    let titleParam = ''
    if (title) {
      titleParam = `title=${title}`
    }
    let tagsParam = ''
    if (tags.length > 0) {
      tagsParam += '&selectedTags='
      tags.forEach((tag, idx) => {
        if (idx === tags.length - 1) {
          tagsParam += `${tag}`
        } else {
          tagsParam += `${tag},`
        }
      })
    }
    console.log(tagsParam)

    return await http.get(`searchAutoCompleteRecipes?${titleParam}${tagsParam}`)
  }

  async addRecipe(recipeData: Partial<RecipeType>) {
    try {
      const authorId: string = AuthAPI.getUID()
      const recipeImage: string = await this.uploadRecipeImage(
        recipeData.recipeImage
      )
      const servingPrice: number = calculateServingPrice(
        recipeData.ingredients,
        recipeData.servings
      )
      const totalTime: number = recipeData.prepTime + (recipeData.cookTime ?? 0)
      const nutritionDataRes = await this.getRecipeNutrition(
        recipeData.ingredients
      )
      const nutritionData = nutritionDataRes.nutritionData
      const nutritionLabels = nutritionDataRes.dietLabels

      const returnRecipeData: RecipeType = {
        _id: '' + ObjectID(),
        title: recipeData.title,
        prepTime: recipeData.prepTime,
        cookTime: recipeData.cookTime,
        servings: recipeData.servings,
        fridgeLife: recipeData.fridgeLife,
        freezerLife: recipeData.freezerLife,
        description: recipeData.description,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        recipeImage,
        nutritionData,
        totalTime,
        authorId,
        rating: {
          rateCount: 0,
          rateValue: 0,
        },
        createdAt: new Date().getTime().toString(),
        editedAt: null,
        servingPrice,
        cuisine: recipeData.cuisine,
        course: recipeData.course,
        nutritionLabels,
      }
    } catch (error) {
      console.log(error)
      // !CATCH ERROR
    }
  }

  async uploadRecipeImage(imageURI: string) {
    if (imageURI) {
      const imageBlobRes = await fetch(imageURI)
      const imageBlob = await imageBlobRes.blob()

      const storage = getStorage()
      const recipeImagesRef = ref(storage, `recipeImages/${Date.now()}`)
      await uploadBytes(recipeImagesRef, imageBlob)
      const fileUrl = await getDownloadURL(recipeImagesRef)
      return fileUrl
    } else {
      throw new Error('Image does not exist')
    }
  }
  async getRecipeNutrition(ingrArr: IngredientsType[]) {
    const ingrData: { title: string; ingredients: string[] } = {
      title: 'recipe 1',
      ingredients: [],
    }
    ingrArr.forEach(ingr => {
      if ('parsedIngredient' in ingr) {
        ingr.parsedIngredient
        const { quantity, unit, ingredient } = ingr.parsedIngredient

        if (quantity) {
          const str = `${quantity} ${unit || ''} ${ingredient}`
          ingrData.ingredients.push(str)
        }
      }
    })

    let nutritionResult: NutritionDataType = await nutrition.post(
      `nutrition-details?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`,
      ingrData
    )

    if (!nutritionResult) return { nutritionData: null, dietLabels: null }

    const currDietLabels: string[] = []

    const returnedNutritionLabels = [
      ...nutritionResult.dietLabels,
      ...nutritionResult.healthLabels,
    ]

    dietLabels.forEach(l => {
      if (returnedNutritionLabels.includes(l.toUpperCase())) {
        currDietLabels.push(l)
      }
    })

    return { nutritionData: nutritionResult, dietLabels: currDietLabels }
  }
}

const RecipeAPI = new RecipeAPIClass()
export default RecipeAPI
