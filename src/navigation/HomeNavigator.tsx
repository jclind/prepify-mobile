import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../screens/Auth/Welcome'
import Login from '../screens/Auth/Login'
import Register from '../screens/Auth/Register'
import sv from '../config/sv'
import { MCIcons } from '../config/types/MCIcons'
import ForgotPassword from '../screens/Auth/ForgotPassword'
import Home from '../screens/App/Home'
import Recipe from '../screens/App/Recipe'
import { useNavigation } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

const formHeaderStyles = ({ navigation }) => ({
  headerShown: false,
})

export default function HomeNavigator() {
  const navigation = useNavigation()
  return (
    <Stack.Navigator screenOptions={formHeaderStyles}>
      <Stack.Screen name='Home' component={Home} options={formHeaderStyles} />
      <Stack.Screen
        name='Recipe'
        component={Recipe}
        options={
          formHeaderStyles
          // headerLeft: props => (
          //   <MCIcons
          //     name={'arrow-left'}
          //     size={28}
          //     color={sv.secondaryText}
          //     onPress={() => navigation.goBack()}
          //   />
          // ),
          // headerRight: props => {
          //   console.log(props)
          //   return (
          //     <View style={styles.iconContainer}>
          //       <MCIcons
          //         name='bookmark-outline'
          //         size={24}
          //         style={styles.icon}
          //       />
          //       <MCIcons name='heart-outline' size={24} style={styles.icon} />
          //     </View>
          //   )
          // },
        }
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  iconContainer: { flexDirection: 'row' },
  icon: {
    paddingHorizontal: 5,
    marginLeft: 5,
  },
})
