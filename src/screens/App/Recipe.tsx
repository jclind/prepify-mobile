import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { RouteProp } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import RecipeAPI from '../../api/recipes'

import RecipeType from '../../config/types/Recipe'
import AppText from '../../components/text/AppText'
import sv from '../../config/sv'
import TotalTimeElement from '../../components/recipes/TotalTimeElement'
import RatingElement from '../../components/recipes/RatingElement'
import RecipeInfoBox from '../../components/recipes/RecipeInfoBox'
import { MCIcons } from '../../config/types/MCIcons'
import { number } from 'yup/lib/locale'
import Ingredients from '../../components/recipes/Ingredients'
import Directions from '../../components/recipes/Directions'

type ParamList = {
  Recipe: {
    _id: string
  }
}

export default function Recipe() {
  const [recipe, setRecipe] = useState<RecipeType>()
  const [servings, setServings] = useState<number | null>()

  const route = useRoute<RouteProp<ParamList, 'Recipe'>>()
  const { params } = route
  const recipeID = params._id

  useEffect(() => {
    RecipeAPI.getRecipe(recipeID).then(res => {
      if (res.data) {
        setServings(Number(res.data?.yield?.value))
        return setRecipe(res.data)
      }
      // !ERROR
    })
  }, [])

  if (!recipe) return null

  return (
    <ScrollView>
      <View style={styles.container} onStartShouldSetResponder={() => true}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.recipeImage }}
            style={styles.image}
            resizeMode='cover'
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'transparent']}
            style={styles.imageGradient}
          />
          <View style={styles.overlayData}>
            <View style={styles.overlayDataItem}>
              <AppText size='small' style={styles.overlayDataItemTitle}>
                Total Time
              </AppText>
              <TotalTimeElement totalTime={Number(recipe.totalTime)} />
            </View>
            <View style={styles.divider} />
            <View style={styles.overlayDataItem}>
              <AppText size='small' style={styles.overlayDataItemTitle}>
                Rating
              </AppText>
              <RatingElement rating={recipe.rating} />
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <AppText style={styles.recipeTitle} size={'mediumLarge'}>
              {recipe.title}
            </AppText>
            <AppText
              style={styles.recipeDescription}
              size={'mediumSmall'}
              numberOfLines={9}
              textColor={sv.secondaryText}
            >
              {recipe.description}
            </AppText>
            <View style={styles.dataBoxContainer}>
              <RecipeInfoBox label='Servings' value={servings} />
              <RecipeInfoBox
                label='Recipe Cost'
                value={(Number(recipe.servingPrice) * Number(servings)).toFixed(
                  2
                )}
              />
              <RecipeInfoBox
                label='Serving Cost'
                value={Number(recipe.servingPrice).toFixed(2)}
              />
            </View>
          </View>
          <Ingredients
            servings={servings}
            setServings={setServings}
            recipe={recipe}
          />
          <Directions recipe={recipe} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 350,
  },
  image: {
    width: '100%',
    height: 350,
  },
  imageGradient: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    padding: 15,
  },
  overlayData: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    zIndex: 2,
    alignSelf: 'center',
    bottom: -35,
    padding: 15,
    borderRadius: sv.borderRadius,
    backgroundColor: sv.primaryBackground,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  overlayDataItem: {
    flex: 1,
    alignItems: 'center',
  },
  overlayDataItemTitle: {
    paddingBottom: 5,
  },
  divider: {
    height: '100%',
    width: 1,
    marginHorizontal: 15,
    backgroundColor: sv.inputBorderColor,
  },
  headerContainer: {
    paddingTop: 40,
    // paddingVertical: 15,
  },
  recipeTitle: {
    textTransform: 'capitalize',
  },
  recipeDescription: {
    paddingTop: 20,
  },
  dataBoxContainer: {
    flexDirection: 'row',
    paddingTop: 45,
    width: '100%',
    justifyContent: 'space-between',
  },
})
