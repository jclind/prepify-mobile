import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import sv from '../config/sv'

export default function PrepifyLogo() {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Prepify</Text>
      <MaterialCommunityIcons name='chef-hat' size={55} color={sv.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 55,
    fontFamily: 'Montserrat_800ExtraBold_Italic',
    color: sv.primary,
    marginRight: 10,
  },
})
