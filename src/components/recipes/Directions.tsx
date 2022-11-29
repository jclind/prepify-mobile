import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RecipeType, { InstructionListType } from '../../config/types/Recipe'
import AppText from '../text/AppText'
import recipeStyles from '../../config/recipeStyles'
import SectionTitle from './SectionTitle'
import SectionListTitle from './SectionListTitle'
import DirectionItem from './DirectionItem'

type DirectionsProps = {
  recipe: RecipeType
}

export default function Directions({ recipe }: DirectionsProps) {
  const renderDirectionsList = (instList: InstructionListType) => {
    return (
      <View style={recipeStyles.sectionList}>
        {instList.list.map(inst => {
          return <DirectionItem direction={inst} key={inst.id} />
        })}
      </View>
    )
  }
  return (
    <View style={recipeStyles.sectionContainer}>
      <SectionTitle>Directions</SectionTitle>
      <View style={recipeStyles.sectionListsContainer}>
        {recipe.instructions.map((instList, idx) => {
          const isMultiInstList = recipe.instructions.length > 1 // true if there is more than one instruction list
          return (
            <View style={styles.directionsItem} key={idx}>
              {isMultiInstList && (
                <SectionListTitle>{instList.name}</SectionListTitle>
              )}
              {renderDirectionsList(instList)}
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  directionsTitle: {
    fontFamily: 'Montserrat_600SemiBold',
    paddingBottom: 5,
  },
  directionsItem: {},
})
