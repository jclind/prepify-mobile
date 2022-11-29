import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import sv from '../config/sv'

import { MCIcons } from '../config/types/MCIcons'
import Account from '../screens/App/Account'
import Home from '../screens/App/Home'
import Search from '../screens/App/Search'
import HomeNavigator from './HomeNavigator'

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
        options={{
          tabBarIcon: ({ size, color }) => (
            <MCIcons name='home' size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MCIcons name='magnify' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Account'
        component={Account}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MCIcons name='account' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
