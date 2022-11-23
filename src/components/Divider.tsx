import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from './text/AppText'
import styleVars from '../config/styleVars'

type DividerProps = {
  text?: string
}

export default function Divider({ text }: DividerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {text && (
        <AppText size='small' style={styles.text}>
          {text}
        </AppText>
      )}
      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    paddingHorizontal: 10,
    color: styleVars.secondaryText,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: styleVars.inputBorderColor,
  },
})
