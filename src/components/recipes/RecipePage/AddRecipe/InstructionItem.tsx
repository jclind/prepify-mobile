import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useRef, useState } from 'react'
import { Swipeable } from 'react-native-gesture-handler'
import AppText from '../../../text/AppText'
import { InstructionsType } from './addRecipeTypes'
import sv from '../../../../config/sv'
import { MCIcons } from '../../../../config/types/MCIcons'
import AddRecipeInput from './AddRecipeInput'

type InstructionItemType = {
  instr: InstructionsType
  removeInstruction: (id: string) => void
  editInstruction: (id: string, updatedItem: InstructionsType) => void
  drag: any
  isActive: any
}

export default function InstructionItem({
  instr,
  removeInstruction,
  editInstruction,
  drag,
  isActive,
}: InstructionItemType) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedVal, setEditedVal] = useState(() => {
    if ('label' in instr) return instr.label
    return instr.content
  })

  const editInputRef = useRef<TextInput>()

  const handleInstructionPress = () => {
    setIsEditing(true)
    if (editInputRef && editInputRef.current) {
      editInputRef.current.focus()
    }
  }
  const handleEditSubmit = () => {
    if (!editedVal) {
      if (editInputRef && editInputRef.current) {
        editInputRef.current.blur()
      }
    } else {
      if ('label' in instr) {
        editInstruction(instr.id, { ...instr, label: editedVal })
      } else {
        editInstruction(instr.id, { ...instr, content: editedVal })
      }
    }
  }

  const RightActions = ({ progress, dragX, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.swipedRow}
        activeOpacity={1}
      >
        <View>
          <Animated.View style={styles.deleteIconContainer}>
            <MCIcons name='trash-can' size={24} style={styles.deleteIcon} />
          </Animated.View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity
      onLongPress={drag}
      onPress={handleInstructionPress}
      disabled={isActive}
    >
      <View style={isEditing ? { height: 0 } : {}}>
        <Swipeable
          renderRightActions={(progress, dragX) => (
            <RightActions
              progress={progress}
              dragX={dragX}
              onPress={() => removeInstruction(instr.id)}
            />
          )}
        >
          <View
            style={styles.instructionContainer}
            // onPress={handleInstructionPress}
            // activeOpacity={1}
          >
            {'content' in instr ? (
              <>
                <View style={styles.indexContainer}>
                  <AppText size='medium' style={styles.indexText}>
                    {instr.index}
                  </AppText>
                </View>
                <Text>
                  <AppText size='mediumSmall'>{instr.content}</AppText>
                </Text>
              </>
            ) : (
              <View style={styles.ingredientLabel} key={instr.id}>
                <AppText size='mediumSmall' style={styles.labelText}>
                  {instr.label}
                </AppText>
              </View>
            )}
          </View>
        </Swipeable>
      </View>
      <View style={!isEditing ? { height: 0, overflow: 'hidden' } : {}}>
        <AddRecipeInput
          val={editedVal}
          setVal={setEditedVal}
          inputRef={editInputRef}
          onBlur={() => setIsEditing(false)}
          onEnter={handleEditSubmit}
        />
      </View>
    </TouchableOpacity>
  )
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
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexShrink: -1,
  },
  animatedInitial: {
    backgroundColor: '#b60000',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    opacity: 0,
  },
  deleteIconContainer: {
    height: '100%',
    backgroundColor: sv.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    width: '100%',
    paddingHorizontal: 20,
    color: sv.primaryBackground,
  },

  indexText: {
    fontFamily: 'Montserrat_700Bold',
  },
  ingredientLabel: {},
  labelText: {
    fontFamily: 'Montserrat_700Bold',
  },
})
