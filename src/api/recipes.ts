import { http, nutrition } from './http-common'

class RecipeAPI {
  async getTrendingRecipes(limit: number = 4) {
    return await http.get(`getTrendingRecipes?limit=${limit}`)
  }
}

export default new RecipeAPI()
