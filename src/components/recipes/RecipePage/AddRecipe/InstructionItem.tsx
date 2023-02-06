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
import SwipeableDelete from './SwipeableDelete'

type InstructionItemType = {
  instr: InstructionsType
  removeInstruction: (id: string) => void
  editInstruction: (id: string, updatedItem: InstructionsType) => void
  drag: any
  isActive: any
}

const Label = ({ id, label }: { id: string; label: string }) => {
  return (
    <View key={id}>
      <AppText size='mediumSmall' style={styles.labelText}>
        {label}
      </AppText>
    </View>
  )
}
const Instruction = ({
  index,
  content,
}: {
  index: number
  content: string
}) => {
  return (
    <>
      <View style={styles.indexContainer}>
        <AppText size='medium' style={styles.indexText}>
          {index}
        </AppText>
      </View>
      <Text>
        <AppText size='mediumSmall'>{content}</AppText>
      </Text>
    </>
  )
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

  return (
    <TouchableOpacity
      onLongPress={drag}
      onPress={handleInstructionPress}
      disabled={isActive}
    >
      <View style={isEditing ? { height: 0 } : {}}>
        <SwipeableDelete removeItem={() => removeInstruction(instr.id)}>
          <View style={styles.instructionContainer}>
            {'label' in instr ? (
              <Label id={instr.id} label={instr.label} />
            ) : (
              <Instruction index={instr.index} content={instr.content} />
            )}
          </View>
        </SwipeableDelete>
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
  indexText: {
    fontFamily: 'Montserrat_700Bold',
  },
  labelText: {
    fontFamily: 'Montserrat_700Bold',
  },
})
