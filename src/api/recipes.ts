import { doc, getDoc } from 'firebase/firestore'
import { db, storage } from './firebase'
import { http, nutrition } from './http-common'
import ingredientParser from '@jclind/ingredient-parser'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

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

  async addRecipe(recipeData) {}

  async uploadRecipeImage(imageURI) {
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
}

const RecipeAPI = new RecipeAPIClass()
export default RecipeAPI
