import {
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { RouteProp } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import RecipeAPI from '../../api/recipes'

import AppText from '../../components/text/AppText'
import sv from '../../config/sv'
import TotalTimeElement from '../../components/recipes/TotalTimeElement'
import RatingElement from '../../components/recipes/RecipePage/RatingElement'
import RecipeInfoBox from '../../components/recipes/RecipePage/RecipeInfoBox'
import Ingredients from '../../components/recipes/RecipePage/Ingredients'
import RecipeHeader from '../../components/recipes/RecipePage/RecipeHeader'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated'
import TagsList from '../../components/recipes/RecipePage/TagsList'
import Ratings from '../../components/recipes/RecipePage/Ratings/Ratings'
import { RecipeType } from '../../../types'
import Instructions from '../../components/recipes/RecipePage/Instructions'

type ParamList = {
  Recipe: {
    _id: string
  }
}

export default function Recipe() {
  const [recipe, setRecipe] = useState<RecipeType>()
  const [servings, setServings] = useState<number | null>()
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const route = useRoute<RouteProp<ParamList, 'Recipe'>>()
  const { params } = route
  const recipeID = params._id
  useEffect(() => {
    RecipeAPI.getRecipe(recipeID).then(res => {
      const result: RecipeType = res.data
      if (result) {
        setServings(result.servings)
        return setRecipe(result)
      }
      // !ERROR
    })
  }, [])

  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y
    },
  })

  const renderLoadingIndication = () => (
    <View style={styles.loadingContainer}>
      <RecipeHeader scrollY={scrollY} />
      <View style={styles.loadingIndicator}>
        <ActivityIndicator size='large' color={sv.primary} />
      </View>
    </View>
  )

  if (!recipe) return renderLoadingIndication()

  return (
    <View style={{ flex: 1 }}>
      {!isImageLoaded && renderLoadingIndication()}
      <RecipeHeader scrollY={scrollY} />
      <Animated.ScrollView scrollEventThrottle={16} onScroll={scrollHandler}>
        <View style={styles.container} onStartShouldSetResponder={() => true}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: recipe.recipeImage }}
              style={styles.image}
              resizeMode='cover'
              onLoad={() => setIsImageLoaded(true)}
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
            </View>
            <ScrollView horizontal={true}>
              <View
                style={styles.dataBoxContainer}
                onStartShouldSetResponder={() => true}
              >
                <RecipeInfoBox label='Servings' value={servings} />
                <RecipeInfoBox
                  label='Recipe Cost'
                  value={`$${((recipe.servingPrice * servings) / 100).toFixed(
                    2
                  )}`}
                />
                <RecipeInfoBox
                  label='Serving Cost'
                  value={`$${(recipe.servingPrice / 100).toFixed(2)}`}
                />
                {recipe.fridgeLife && (
                  <RecipeInfoBox
                    label='Fridge Life'
                    value={`${recipe.fridgeLife} days`}
                  />
                )}
                {recipe.freezerLife && (
                  <RecipeInfoBox
                    label='Freezer Life'
                    value={`${recipe.freezerLife} days`}
                  />
                )}
              </View>
            </ScrollView>
            <Ingredients
              servings={servings}
              setServings={setServings}
              originalServings={recipe.servings}
              ingredients={recipe.ingredients}
            />
            <Instructions instructions={recipe.instructions} />
            <TagsList recipe={recipe} />
            <Ratings recipeID={recipe._id} rating={recipe.rating} />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: sv.primaryBackground,
    flex: 1,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {},
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
    paddingVertical: 15,
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
    paddingHorizontal: 15,
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
    paddingBottom: 5,
    width: '100%',
    paddingLeft: 10,
  },
})
