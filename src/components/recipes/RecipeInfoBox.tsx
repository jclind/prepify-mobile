import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../text/AppText'
import styleVars from '../../config/styleVars'

type RecipeInfoBoxProps = {
  label: string
  value: string
}

export default function RecipeInfoBox({ label, value }: RecipeInfoBoxProps) {
  return (
    <View style={styles.dataBox}>
      <AppText
        style={styles.dataBoxTitle}
        size='small'
        textColor={styleVars.secondaryText}
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
    borderColor: styleVars.inputBorderColor,
    borderRadius: styleVars.borderRadius,
    height: 100,
    width: 110,
  },
  dataBoxTitle: {
    position: 'absolute',
    top: 15,
  },
  dataBoxValue: {
    fontFamily: 'Montserrat_600SemiBold',
  },
})
