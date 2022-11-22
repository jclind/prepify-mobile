import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Screen from '../../components/layout/Screen'
import TrendingRecipeList from '../../components/recipes/TrendingRecipeList'

export default function Home() {
  return (
    <Screen>
      <TrendingRecipeList />
    </Screen>
  )
}

const styles = StyleSheet.create({})
