import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { InstructionType } from '../../config/types/Recipe'
import AppText from '../text/AppText'
import sv from '../../config/sv'
import Checkbox from 'expo-checkbox'

type DirectionItemProps = {
  direction: InstructionType
}

export default function DirectionItem({ direction }: DirectionItemProps) {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <TouchableOpacity
      onPress={() => setIsChecked(prev => !prev)}
      activeOpacity={0.8}
      style={isChecked ? [styles.container, styles.checked] : styles.container}
    >
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setIsChecked}
        color={isChecked ? sv.primary : undefined}
      />
      <View>
        <AppText size='medium' style={styles.indexText}>
          Step {direction.index}
        </AppText>
        <AppText size='mediumSmall' style={styles.content} numberOfLines={10}>
          {direction.content.trim()}
        </AppText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
    maxWidth: '100%',
  },
  checkbox: {
    borderRadius: 8,
    height: 25,
    width: 25,
    marginRight: 15,
  },
  checked: {
    opacity: 0.6,
  },
  indexText: {
    fontFamily: 'Montserrat_600SemiBold',
    paddingBottom: 10,
  },
  content: {
    flex: 1,
    paddingRight: 10,
  },
})
