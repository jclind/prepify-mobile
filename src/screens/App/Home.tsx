import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Screen from '../../components/layout/Screen'
import TrendingRecipeList from '../../components/recipes/TrendingRecipeList'
import AccountBar from '../../components/AccountBar'

export default function Home() {
  return (
    <Screen>
      <AccountBar />
      <TrendingRecipeList />
    </Screen>
  )
}

const styles = StyleSheet.create({})
