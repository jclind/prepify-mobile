import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RecipeType, { InstructionListType } from '../../../config/types/Recipe'
import AppText from '../../text/AppText'
import recipeStyles from '../../../config/recipeStyles'
import SectionTitle from './SectionTitle'
import SectionListTitle from './SectionListTitle'
import DirectionItem from './InstructionsItem'
import { InstructionsType } from '../../../../types'
import InstructionsItem from './InstructionsItem'

type InstructionsProps = {
  instructions: InstructionsType[]
}

export default function Instructions({ instructions }: InstructionsProps) {
  return (
    <View style={recipeStyles.sectionContainer}>
      <SectionTitle>Directions</SectionTitle>
      <View style={recipeStyles.sectionListsContainer}>
        {instructions.map((instr, idx) => {
          return (
            <View style={recipeStyles.sectionList} key={idx}>
              <DirectionItem instruction={instr} key={instr.id} />
            </View>
          )
        })}
      </View>
      <View style={recipeStyles.horizontalDivider} />
    </View>
  )
}

const styles = StyleSheet.create({})
