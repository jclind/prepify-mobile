import { Firestore } from '@firebase/firestore'
import { db } from './firebase'
import { http, nutrition } from './http-common'

class RecipeAPI {
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
  getUsername = async userId => {
    const usernamesRef = doc(db, 'username', userId)
    const usernamesSnap = await getDoc(usernamesRef)
    console.log(usernamesSnap)

    // if (usernamesSnap.exists()) {
    //   const currUsername = usernamesSnap.data().username
    //   return currUsername
    // } else {
    //   navigate('/create-username')
    //   return null
    // }
  }
}

export default new RecipeAPI()
function doc(db: Firestore, arg1: string, userId: any) {
  throw new Error('Function not implemented.')
}

function getDoc(usernamesRef: any) {
  throw new Error('Function not implemented.')
}
