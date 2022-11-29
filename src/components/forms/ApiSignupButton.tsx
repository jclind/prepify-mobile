import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import sv from '../../config/sv'
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
      <MCIcons
        name={iconName}
        size={28}
        style={styles.icon}
        color={sv.primaryText}
      />
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
    borderColor: sv.secondaryText,
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    left: 30,
  },
  text: {
    paddingLeft: 10,
  },
})
