import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../../text/AppText'
import SectionTitle from './SectionTitle'
import sv from '../../../config/sv'
import recipeStyles from '../../../config/recipeStyles'

type TagsListProps = { tags: string[] }

export default function TagsList({ tags }: TagsListProps) {
  return (
    <View style={recipeStyles.sectionContainer}>
      <View style={styles.container}>
        <SectionTitle>Tags</SectionTitle>
        <View style={styles.tagsList}>
          {tags.map(tag => {
            return (
              <AppText size='mediumSmall' style={styles.tag} key={tag}>
                {tag}
              </AppText>
            )
          })}
        </View>
      </View>
      <View style={recipeStyles.horizontalDivider} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', paddingBottom: 45 },

  tagsList: { flexDirection: 'row', marginLeft: 15 },
  tag: {
    backgroundColor: sv.tagBackground,
    borderWidth: 1,
    borderRadius: sv.borderRadius,
    borderColor: sv.tagBorderColor,
    overflow: 'hidden',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
})
