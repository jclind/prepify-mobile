import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../../text/AppText'
import sv from '../../../config/sv'

type RecipeInfoBoxProps = {
  label: string
  value: string | number
}

export default function RecipeInfoBox({ label, value }: RecipeInfoBoxProps) {
  return (
    <View style={styles.dataBox}>
      <AppText
        style={styles.dataBoxTitle}
        size='small'
        textColor={sv.secondaryText}
      >
        {label}
      </AppText>
      <AppText style={styles.dataBoxValue} size='medium'>
        {value}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  dataBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,

    borderWidth: 1,
    borderColor: sv.inputBorderColor,
    borderRadius: sv.borderRadius,
    height: 100,
    width: 110,
    marginHorizontal: 5,
  },
  dataBoxTitle: {
    position: 'absolute',
    top: 15,
  },
  dataBoxValue: {
    fontFamily: 'Montserrat_600SemiBold',
  },
})
