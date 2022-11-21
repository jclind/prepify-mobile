import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styleVars from '../../config/styleVars'
import defaultStyles from '../../config/defaultStyles'
import { MCProps, MCIcons } from '../../config/types/MCIcons'

type ApiSignupButtonProps = MCProps & {
  text: string
}

export default function ApiSignupButton({
  iconName,
  text,
}: ApiSignupButtonProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <MCIcons name={iconName} size={32} style={styles.icon} />
      <Text style={[defaultStyles.text, styles.text]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    // paddingLeft: 30,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: styleVars.secondaryText,
    marginVertical: 10,
  },
  icon: {
    position: 'absolute',
    left: 30,
  },
  text: {
    paddingLeft: 10,
  },
})
