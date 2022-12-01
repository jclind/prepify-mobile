import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Rating } from 'react-native-ratings'

import ReviewType from '../../../../config/types/Review'
import sv from '../../../../config/sv'
import AppText from '../../../text/AppText'
import RecipeAPI from '../../../../api/recipes'
import { formatDate } from '../../../../util/formatDate'
import { MCIcons } from '../../../../config/types/MCIcons'

type ReviewItemProps = {
  review: ReviewType
}

export default function ReviewItem({ review }: ReviewItemProps) {
  const [authorUsername, setAuthorUsername] = useState<string | null>(null)

  useEffect(() => {
    RecipeAPI.getUsername(review.userId).then(res => {
      setAuthorUsername(res)
    })
  }, [])

  return (
    <View style={styles.reviewItem}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <AppText size='mediumSmall' style={styles.authorUsername}>
            {authorUsername}
          </AppText>
          <Rating
            type='custom'
            ratingCount={5}
            ratingBackgroundColor={sv.tertiaryBackground}
            ratingColor={sv.primary}
            tintColor={sv.secondaryBackground}
            fractions={1}
            startingValue={Number(review.rating)}
            imageSize={16}
            style={styles.starRating}
          />
        </View>
        <AppText size='small' style={styles.date}>
          {formatDate(Number(review.reviewCreatedAt), true)}
        </AppText>
      </View>
      <View style={styles.content}>
        <AppText size='mediumSmall' style={styles.reviewText} numberOfLines={7}>
          {review.reviewText}
        </AppText>
      </View>
      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => console.log('liked')}
          style={styles.likeBtn}
        >
          <MCIcons name='thumb-up-outline' size={18} color={sv.secondaryText} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  reviewItem: {
    width: '100%',
    backgroundColor: sv.secondaryBackground,
    padding: 15,
    borderRadius: sv.borderRadius,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  authorUsername: {
    fontFamily: 'Montserrat_600SemiBold',
    paddingBottom: 5,
    marginRight: 15,
  },
  starRating: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  date: { color: sv.tertiaryText, fontFamily: 'Montserrat_500Medium' },
  content: {
    paddingVertical: 15,
  },
  reviewText: {
    fontFamily: 'Montserrat_400Regular',
  },
  options: { flexDirection: 'row' },
  likeBtn: {},
})
