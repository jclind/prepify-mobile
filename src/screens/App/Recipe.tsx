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
import styleVars from '../../config/styleVars'
import TotalTimeElement from '../../components/recipes/TotalTimeElement'
import RatingElement from '../../components/recipes/RatingElement'
import RecipeInfoBox from '../../components/recipes/RecipeInfoBox'
import { MCIcons } from '../../config/types/MCIcons'
import { number } from 'yup/lib/locale'

type ParamList = {
  Recipe: {
    _id: string
  }
}

export default function Recipe() {
  const [recipe, setRecipe] = useState<RecipeType>()
  const [servings, setServings] = useState<number | null>()

  const decServings = () => {
    if (servings > 1) setServings(prev => prev - 1)
  }
  const incServings = () => {
    if (servings < 99) setServings(prev => prev + 1)
  }

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
              textColor={styleVars.secondaryText}
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
          <View style={styles.ingredientsContainer}>
            <View style={styles.ingredientsContainerHeader}>
              <View style={styles.left}>
                <AppText style={styles.ingredientsTitle} size='medium'>
                  Ingredients for
                </AppText>
                <AppText size='mediumSmall' textColor={styleVars.tertiaryText}>
                  {`${recipe.yield.value} ${recipe.yield.type.value}`}
                </AppText>
              </View>
              <View style={styles.right}>
                <View style={styles.servingModContainer}>
                  <TouchableOpacity
                    style={styles.servingsMod}
                    onPress={decServings}
                  >
                    <MCIcons
                      name='minus'
                      size={18}
                      color={styleVars.primaryText}
                    />
                  </TouchableOpacity>
                  <AppText size='medium'>{servings}</AppText>
                  <TouchableOpacity
                    style={styles.servingsMod}
                    onPress={incServings}
                  >
                    <MCIcons
                      name='plus'
                      size={18}
                      color={styleVars.primaryText}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
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
    borderRadius: styleVars.borderRadius,
    backgroundColor: styleVars.primaryBackground,
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
    backgroundColor: styleVars.inputBorderColor,
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
    paddingVertical: 40,
    width: '100%',
    justifyContent: 'space-between',
  },
  ingredientsContainer: {},
  ingredientsTitle: {
    fontFamily: 'Montserrat_600SemiBold',
    paddingBottom: 5,
  },
  ingredientsContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {},
  right: {},
  servingModContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: styleVars.secondaryBackground,

    borderRadius: styleVars.borderRadius,
  },
  servingsMod: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
})
