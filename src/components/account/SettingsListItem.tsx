import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MCIcons } from '../../config/types/MCIcons'
import sv from '../../config/sv'
import AppText from '../text/AppText'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

type SettingsListItemProps = {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap
  title: string
  action?: () => void | string
}

// !! react native feedback

export default function SettingsListItem({
  iconName,
  title,
  action,
}: SettingsListItemProps) {
  const navigation = useNavigation()
  const handlePress = () => {
    if (action) {
      if (typeof action === 'string') {
        // navigation.navigate()
      } else {
        action()
      }
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <MCIcons
        name={iconName}
        size={28}
        color={sv.secondaryText}
        style={styles.icon}
      />
      <AppText size='mediumSmall' style={styles.title}>
        {title}
      </AppText>
      <MCIcons name='chevron-right' size={26} style={styles.chevronRight} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    textTransform: 'capitalize',
    flex: 1,
  },
  chevronRight: {
    color: sv.tertiaryText,
    paddingRight: 5,
  },
})
