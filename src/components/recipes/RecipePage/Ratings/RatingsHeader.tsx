import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Rating } from 'react-native-ratings'
import AppText from '../../../text/AppText'
import sv from '../../../../config/sv'

type RatingsHeaderProps = {
  averageRating: number
  rateCount: number
}

export default function RatingsHeader({
  averageRating,
  rateCount,
}: RatingsHeaderProps) {
  return (
    <View style={styles.ratingsHeader}>
      {averageRating > 0 ? (
        <>
          <View style={styles.ratingString}>
            <AppText size='mediumLarge' style={styles.ratingAverage}>
              {averageRating}
            </AppText>
            <AppText size='medium' style={styles.ratingCount}>
              ({rateCount})
            </AppText>
          </View>
          <View style={styles.verticalDivider} />

          <Rating
            type='custom'
            ratingCount={5}
            ratingBackgroundColor={sv.tertiaryBackground}
            ratingColor={sv.primary}
            tintColor={sv.primaryBackground}
            fractions={1}
            startingValue={averageRating}
            style={styles.ratingStars}
            imageSize={25}
          />
        </>
      ) : (
        <AppText size='mediumLarge'>No Ratings</AppText>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  ratingsHeader: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 25,
  },
  ratingString: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingAverage: {
    paddingRight: 5,
  },
  ratingCount: {
    fontFamily: 'Montserrat_400Regular',
  },
  verticalDivider: {
    height: '100%',
    width: 1,
    backgroundColor: sv.inputBorderColor,
    marginHorizontal: 15,
  },
  ratingStars: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: sv.primaryBackground,
  },
})
