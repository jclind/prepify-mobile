import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import sv from '../../config/sv'
import AppText from '../text/AppText'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import TotalTimeElement from './TotalTimeElement'
import RatingElement from './RecipePage/RatingElement'
import { RecipeType } from '../../../types'

type RecipeThumbnailProps = {
  recipe: RecipeType
}
type RootStackParamList = {
  Recipe: { _id: string } | undefined
}

export default function RecipeThumbnail({ recipe }: RecipeThumbnailProps) {
  const [isImgLoaded, setIsImgLoaded] = useState(false)

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const priceText = () => {
    const servingPrice = recipe.servingPrice / 100
    const numServings = recipe.servings
    const recipePrice = servingPrice * numServings
    return (
      <AppText
        size='small'
        style={styles.priceText}
      >{`Serving: $${servingPrice.toFixed(2)} | Recipe: $${recipePrice.toFixed(
        2
      )}`}</AppText>
    )
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => navigation.navigate('Recipe', { _id: recipe._id })}
    >
      <View style={styles.imageContainer}>
        {!isImgLoaded && <View style={styles.imageLoadingPlaceholder} />}
        <Image
          source={{ uri: recipe.recipeImage }}
          style={styles.recipeImage}
          resizeMode='cover'
          onLoad={() => setIsImgLoaded(true)}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <AppText size='medium' style={styles.title} numberOfLines={2}>
            {recipe.title}
          </AppText>
        </View>
        {priceText()}
        <View style={styles.footerData}>
          <TotalTimeElement totalTime={Number(recipe.totalTime)} />
          <RatingElement rating={recipe.rating} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 275,
    borderColor: sv.inputBorderColor,
    borderWidth: 1,
    borderRadius: sv.borderRadius,
    overflow: 'hidden',
    marginRight: 20,
  },
  imageContainer: {},
  recipeImage: {
    width: '100%',
    height: 200,
  },
  imageLoadingPlaceholder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: sv.secondaryBackground,
    zIndex: 1,
  },
  content: {
    padding: 10,
    paddingTop: 5,
    height: 125,
  },
  textContainer: {
    flex: 1,
    width: '100%',
    // minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textTransform: 'capitalize',
    marginBottom: 5,
    // textAlignVertical: 'middle',
    textAlign: 'center',
    alignItems: 'center',
  },
  priceText: {
    color: sv.primary,
    fontFamily: 'Montserrat_600SemiBold',
    width: '100%',
    textAlign: 'center',
  },

  footerData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
})
