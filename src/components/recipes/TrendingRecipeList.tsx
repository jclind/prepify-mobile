import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, Fragment } from 'react'
import RecipeAPI from '../../api/recipes'
import RecipeType from '../../config/types/Recipe'
import RecipeThumbnail from './RecipeThumbnail'

export default function TrendingRecipeList() {
  const [recipes, setRecipes] = useState<RecipeType[] | null>([])

  const { getTrendingRecipes } = RecipeAPI

  useEffect(() => {
    getTrendingRecipes(6).then(res => {
      setRecipes(res.data)
    })
  }, [])

  return (
    <View>
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          {recipes.map(recipe => {
            return (
              <Fragment key={recipe._id}>
                <RecipeThumbnail recipe={recipe} />
              </Fragment>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    // flex: 1,
    // backgroundColor: 'red',
  },
  container: {
    // flex: 1,
    flexDirection: 'row',
    paddingBottom: 5,
    marginHorizontal: 20,
  },
})
