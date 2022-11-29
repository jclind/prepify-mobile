import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../text/AppText'
import recipeStyles from '../../config/recipeStyles'

type SectionTitleProps = {
  children: string
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <AppText style={recipeStyles.sectionTitle} size='medium'>
      {children}:
    </AppText>
  )
}

const styles = StyleSheet.create({})
