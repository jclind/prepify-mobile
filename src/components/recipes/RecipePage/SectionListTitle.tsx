import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import sv from '../../../config/sv'
import recipeStyles from '../../../config/recipeStyles'
import AppText from '../../text/AppText'

type SectionListTitle = {
  children: string
}

export default function SectionListTitle({ children }: SectionListTitle) {
  return (
    <View>
      <AppText size='mediumSmall' style={styles.sectionListTitle}>
        {children}
      </AppText>
      <View style={recipeStyles.horizontalDivider} />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionListTitle: {
    marginTop: 25,
    marginBottom: 5,
    color: sv.primary,
    fontFamily: 'Montserrat_600SemiBold',
  },
})
