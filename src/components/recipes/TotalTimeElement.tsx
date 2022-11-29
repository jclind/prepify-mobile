import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MCIcons } from '../../config/types/MCIcons'
import sv from '../../config/sv'
import AppText from '../text/AppText'

type TotalTimeElementProps = {
  totalTime: number
  containerStyle?: any
  iconStyle?: any
}

export default function TotalTimeElement({
  totalTime,
  containerStyle,
  iconStyle,
}: TotalTimeElementProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <MCIcons
        style={[styles.icon, iconStyle]}
        name='timer-outline'
        size={24}
        color={sv.primaryText}
      />
      <AppText size='mediumSmall'>
        {totalTime > 1 ? `${totalTime} mins` : `${totalTime} min`}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
})
