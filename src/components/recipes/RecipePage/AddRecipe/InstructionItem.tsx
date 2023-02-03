import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import { Swipeable } from 'react-native-gesture-handler'
import AppText from '../../../text/AppText'
import { InstructionsType } from './addRecipeTypes'
import sv from '../../../../config/sv'
import { MCIcons } from '../../../../config/types/MCIcons'

type InstructionItemType = {
  instr: InstructionsType
  removeInstruction: (id: string) => void
}

export default function InstructionItem({
  instr,
  removeInstruction,
}: InstructionItemType) {
  const RightActions = ({ progress, dragX, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.swipedRow}>
        <View>
          <Animated.View>
            <MCIcons
              name='trash-can'
              size={24}
              style={styles.deleteIcon}
              // color={sv.primaryText}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    )
  }
  if ('content' in instr) {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) => (
          <RightActions
            progress={progress}
            dragX={dragX}
            onPress={() => removeInstruction(instr.id)}
          />
        )}
      >
        <TouchableOpacity style={styles.instructionContainer}>
          <View style={styles.indexContainer}>
            <AppText size='medium' style={styles.indexText}>
              {instr.index}
            </AppText>
          </View>
          <Text>
            <AppText size='mediumSmall'>{instr.content}</AppText>
          </Text>
        </TouchableOpacity>
      </Swipeable>
    )
  }
  if ('label' in instr) {
    return (
      <View style={styles.ingredientLabel} key={instr.id}>
        <AppText size='mediumSmall' style={styles.labelText}>
          {instr.label}
        </AppText>
      </View>
    )
  }
  return null
}

const styles = StyleSheet.create({
  instructionContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingLeft: 15,
    backgroundColor: sv.primaryBackground,
    overflow: 'hidden',
  },
  indexContainer: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 15,
    backgroundColor: sv.tertiaryBackground,
  },

  swipedRow: {
    backgroundColor: sv.danger,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexShrink: -1,
  },

  deleteIcon: {
    width: '100%',
    paddingHorizontal: 20,
    color: sv.primaryBackground,
  },

  indexText: {
    fontFamily: 'Montserrat_700Bold',
  },
  ingredientLabel: {
    paddingVertical: 20,
  },
  labelText: {
    fontFamily: 'Montserrat_700Bold',
  },
})
