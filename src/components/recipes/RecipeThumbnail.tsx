import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RecipeType from '../../config/types/Recipe'
import styleVars from '../../config/styleVars'
import AppText from '../text/AppText'
import { MCIcons } from '../../config/types/MCIcons'
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
      <AppText
        size='small'
        style={styles.priceText}
      >{`Serving: $${servingPrice} | Recipe: $${recipePrice}`}</AppText>
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
        <AppText size='mediumSmall'>
          {totalTime > 1 ? `${totalTime} mins` : `${totalTime} min`}
        </AppText>
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
        <AppText size='mediumSmall'>
          {formattedRating} {rateCount ? `(${rateCount})` : ''}
        </AppText>
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
          <AppText size='medium' style={styles.title} numberOfLines={2}>
            {recipe.title}
          </AppText>
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
    height: 135,
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
    marginBottom: 10,
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
