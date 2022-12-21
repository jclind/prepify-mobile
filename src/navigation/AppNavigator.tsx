import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import sv from '../config/sv'

import { MCIcons } from '../config/types/MCIcons'
import Account from '../screens/App/Account'
import Home from '../screens/App/Home'
import Search from '../screens/App/Search'
import HomeNavigator from './HomeNavigator'
import * as Haptics from 'expo-haptics'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AddRecipe from '../screens/App/AddRecipe'

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: sv.primaryBackground },
        tabBarActiveTintColor: sv.primary,
      }}
    >
      <Tab.Screen
        name='Feed'
        component={HomeNavigator}
        listeners={{
          tabPress: () => {
            Haptics.selectionAsync()
          },
        }}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MCIcons name='home' size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name='Search'
        component={Search}
        listeners={{
          tabPress: () => {
            Haptics.selectionAsync()
          },
        }}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MCIcons name='magnify' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Account'
        component={Account}
        listeners={{
          tabPress: () => {
            Haptics.selectionAsync()
          },
        }}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MCIcons name='account' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Add Recipe'
        component={AddRecipe}
        listeners={{
          tabPress: () => {
            Haptics.selectionAsync()
          },
        }}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MCIcons name='account' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
