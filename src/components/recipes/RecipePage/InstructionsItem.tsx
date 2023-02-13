import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { InstructionType } from '../../../config/types/Recipe'
import AppText from '../../text/AppText'
import sv from '../../../config/sv'
import Checkbox from 'expo-checkbox'
import { InstructionsType } from '../../../../types'
import SectionListTitle from './SectionListTitle'

type InstructionsItemProps = {
  instruction: InstructionsType
}

export default function InstructionsItem({
  instruction,
}: InstructionsItemProps) {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <View style={{ flex: 1, width: '100%' }}>
      {'label' in instruction ? (
        <SectionListTitle>{instruction.label}</SectionListTitle>
      ) : (
        <TouchableWithoutFeedback onPress={() => setIsChecked(prev => !prev)}>
          <View
            style={
              isChecked ? [styles.container, styles.checked] : styles.container
            }
          >
            <AppText size='medium' style={styles.indexText}>
              Step {instruction.index}
            </AppText>
            <AppText
              size='mediumSmall'
              style={styles.content}
              numberOfLines={10}
            >
              {instruction.content.trim()}
            </AppText>

            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? sv.primary : undefined}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    borderRadius: sv.borderRadius,
    marginBottom: 35,
    padding: 15,
    backgroundColor: sv.secondaryBackground,
  },
  checkbox: {
    position: 'absolute',
    top: 15,
    right: 15,
    borderRadius: 5,
    height: 22,
    width: 22,
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
