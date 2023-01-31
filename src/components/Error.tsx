import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from './text/AppText'
import sv from '../config/sv'
import { MCIcons } from '../config/types/MCIcons'

type ErrorProps = {
  error: string
}

export default function Error({ error }: ErrorProps) {
  return (
    <View style={styles.container}>
      <MCIcons name='alert' size={18} />
      <AppText size='mediumSmall' style={styles.errorText}>
        {error}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: sv.danger,
    padding: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: sv.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    paddingLeft: 10,
    color: sv.primaryBackground,
  },
})
