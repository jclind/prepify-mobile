import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { formatRating } from '../../util/formatRating'
import sv from '../../config/sv'
import { MCIcons } from '../../config/types/MCIcons'
import AppText from '../text/AppText'

type RatingElementProps = {
  rating: { rateValue: string; rateCount: string }
  containerStyle?: any
  iconStyle?: any
}

export default function RatingElement({
  rating,
  containerStyle,
  iconStyle,
}: RatingElementProps) {
  const rateValue = Number(rating.rateValue)
  const rateCount = Number(rating.rateCount)

  const formattedRating = formatRating(rateValue, rateCount)

  return (
    <View style={[styles.container, containerStyle]}>
      <MCIcons
        style={[styles.icon, iconStyle]}
        name='star-outline'
        size={24}
        color={sv.primaryText}
      />
      <AppText size='mediumSmall'>
        {formattedRating} {rateCount ? `(${rateCount})` : ''}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
})
