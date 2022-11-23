import { http, nutrition } from './http-common'

class RecipeAPI {
  async getTrendingRecipes(limit: number = 4) {
    return await http.get(`getTrendingRecipes?limit=${limit}`)
  }
  async getRecipe(_id) {
    return await http.get(`getRecipe?id=${_id}`)
  }
}

export default new RecipeAPI()
