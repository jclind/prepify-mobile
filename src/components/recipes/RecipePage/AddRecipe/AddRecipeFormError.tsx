import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../../../text/AppText'
import { MCIcons } from '../../../../config/types/MCIcons'
import sv from '../../../../config/sv'

type ErrorMessageProps = {
  error: string
  style?: any
}

export default function ErrorMessage({ error, style }: ErrorMessageProps) {
  if (!error) return null

  return (
    <View style={[styles.container, style]}>
      <MCIcons name='alert-circle-outline' size={18} color={sv.danger} />
      <AppText size='small' style={styles.error}>
        {error}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', paddingVertical: 15 },
  error: {
    color: sv.danger,
    fontFamily: 'Montserrat_600SemiBold',
    paddingLeft: 5,
  },
})
