import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RecipeType from '../../config/types/Recipe'
import styleVars from '../../config/styleVars'
import TextMedium from '../text/TextMedium'
import TextSmall from '../text/TextSmall'
import { MCIcons } from '../../config/types/MCIcons'
import TextMediumSmall from '../text/TextMediumSmall'
import { formatRating } from '../../util/formatRating'

type RecipeThumbnailProps = {
  recipe: RecipeType
}

export default function RecipeThumbnail({ recipe }: RecipeThumbnailProps) {
  const priceText = () => {
    const servingPrice = Number(recipe.servingPrice)
    const numServings = Number(recipe.yield.value)
    const recipePrice = (servingPrice * numServings).toFixed(2)
    return (
      <TextSmall
        style={styles.priceText}
      >{`Serving: $${servingPrice} | Recipe: $${recipePrice}`}</TextSmall>
    )
  }
  const totalTime = () => {
    const totalTime = Number(recipe.totalTime)
    return (
      <View style={styles.footerItem}>
        <MCIcons
          style={styles.footerItemIcon}
          name='timer-outline'
          size={24}
          color={styleVars.primaryText}
        />
        <TextMediumSmall>
          {totalTime > 1 ? `${totalTime} mins` : `${totalTime} min`}
        </TextMediumSmall>
      </View>
    )
  }
  const rating = () => {
    const rateValue = Number(recipe.rating.rateValue)
    const rateCount = Number(recipe.rating.rateCount)

    const formattedRating = formatRating(rateValue, rateCount)

    return (
      <View style={styles.footerItem}>
        <MCIcons
          style={styles.footerItemIcon}
          name='star-outline'
          size={24}
          color={styleVars.primaryText}
        />
        <TextMediumSmall>
          {formattedRating} {rateCount ? `(${rateCount})` : ''}
        </TextMediumSmall>
      </View>
    )
  }

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <Image
        source={{ uri: recipe.recipeImage }}
        style={styles.recipeImage}
        resizeMode='cover'
      />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <TextMedium style={styles.title}>{recipe.title} More Text</TextMedium>
        </View>
        {priceText()}
        <View style={styles.footerData}>
          {totalTime()}
          {rating()}
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
    height: 125,
  },
  textContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textTransform: 'capitalize',
    marginBottom: 10,
    textAlignVertical: 'middle',
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
    marginTop: 15,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerItemIcon: {
    marginRight: 5,
  },
})
