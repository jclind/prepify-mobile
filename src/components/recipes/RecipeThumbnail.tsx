import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RecipeType from '../../config/types/Recipe'
import styleVars from '../../config/styleVars'
import AppText from '../text/AppText'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import TotalTimeElement from './TotalTimeElement'
import RatingElement from './RatingElement'

type RecipeThumbnailProps = {
  recipe: RecipeType
}
type RootStackParamList = {
  Recipe: { _id: string } | undefined
}

export default function RecipeThumbnail({ recipe }: RecipeThumbnailProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const priceText = () => {
    const servingPrice = Number(recipe.servingPrice)
    const numServings = Number(recipe.yield.value)
    const recipePrice = (servingPrice * numServings).toFixed(2)
    return (
      <AppText
        size='small'
        style={styles.priceText}
      >{`Serving: $${servingPrice} | Recipe: $${recipePrice}`}</AppText>
    )
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => navigation.navigate('Recipe', { _id: recipe._id })}
    >
      <Image
        source={{ uri: recipe.recipeImage }}
        style={styles.recipeImage}
        resizeMode='cover'
      />
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
    borderColor: styleVars.inputBorderColor,
    borderWidth: 1,
    borderRadius: styleVars.borderRadius,
    overflow: 'hidden',
    marginRight: 20,
  },
  recipeImage: {
    width: '100%',
    height: 200,
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
    color: styleVars.primary,
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