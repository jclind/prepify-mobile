import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../../text/AppText'
import SectionTitle from './SectionTitle'
import sv from '../../../config/sv'
import recipeStyles from '../../../config/recipeStyles'
import { RecipeType } from '../../../../types'
import { useState, useEffect } from 'react'

type TagsListProps = { recipe: RecipeType }

export default function TagsList({ recipe }: TagsListProps) {
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    const tempTags: string[] = []
    recipe.cuisine && tempTags.push(recipe.cuisine)
    tempTags.push(...recipe.mealTypes)
    tempTags.push(...recipe.nutritionLabels)
    setTags(tempTags)
  }, [])

  return (
    <View style={recipeStyles.sectionContainer}>
      <View style={styles.container}>
        <SectionTitle>Tags</SectionTitle>
        <View style={styles.tagsList}>
          {tags.map(tag => {
            return (
              <AppText size='small' style={styles.tag} key={tag}>
                {tag.toLowerCase().replace('_', ' ')}
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
  container: { paddingBottom: 45 },

  tagsList: { flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 },
  tag: {
    backgroundColor: sv.tagBackground,
    borderWidth: 1,
    borderRadius: sv.borderRadius,
    borderColor: sv.tagBorderColor,
    overflow: 'hidden',
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginRight: 5,
    marginBottom: 5,
    fontFamily: 'Montserrat_600SemiBold',
    color: sv.primaryBackground,
  },
})
