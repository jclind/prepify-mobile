import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextSmall from './TextSmall'
import styleVars from '../config/styleVars'

type DividerProps = {
  text?: string
}

export default function Divider({ text }: DividerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {text && <TextSmall style={styles.text}>{text}</TextSmall>}
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
