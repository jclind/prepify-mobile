import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AddRecipeInput from './AddRecipeInput'
import { InstructionsType } from './addRecipeTypes'
import AddLabelContainer from './AddLabelContainer'
import uuid from 'react-native-uuid'
import AppText from '../../../text/AppText'
import sv from '../../../../config/sv'
import InstructionItem from './InstructionItem'

type InstructionsContainerTypes = {
  instructions: InstructionsType[]
  setInstructions: (val) => void
}

export default function InstructionsContainer({
  instructions,
  setInstructions,
}: InstructionsContainerTypes) {
  const [inputVal, setInputVal] = useState('')
  const [labelVal, setLabelVal] = useState('')

  // Removes given instruction and updates 'index' value by subtracting one to each instruction after the removed index
  const removeInstruction = (removeId: string) => {
    const removedInstructionsArr = instructions.filter(
      instr => instr.id !== removeId
    )
    const removedIdx = instructions.findIndex(instr => instr.id === removeId)
    const updatedInstructionsArr = removedInstructionsArr.map((instr, idx) => {
      if ('label' in instr) return instr
      if (removedIdx <= idx) {
        return { ...instr, index: instr.index - 1 }
      }
      return instr
    })
    setInstructions(updatedInstructionsArr)
  }
  const addInstruction = (data: { label: string } | { content: string }) => {
    setInstructions(prev => {
      const id = uuid.v4().toString()
      let instructionData: InstructionsType
      if ('label' in data) {
        instructionData = { ...data, id }
      } else {
        // Get array of instructions without headers for proper indexing
        const instructionOnlyArr = prev.filter(instr => instr.content)
        instructionData = {
          ...data,
          index: instructionOnlyArr.length + 1,
          id,
        }
      }
      return [...prev, instructionData]
    })
  }

  const handleEnter = () => {
    if (!inputVal) return
    addInstruction({ content: inputVal })
  }

  return (
    <View>
      <AddRecipeInput
        val={inputVal}
        setVal={setInputVal}
        numberOfLines={4}
        onEnter={handleEnter}
      />
      <View style={styles.instructionsList}>
        {instructions.length > 0 &&
          instructions.map(instr => (
            <InstructionItem
              key={instr.id}
              instr={instr}
              removeInstruction={removeInstruction}
            />
          ))}
      </View>
      <View style={styles.mx}>
        <AddLabelContainer
          labelVal={labelVal}
          setLabelVal={setLabelVal}
          addToList={addInstruction}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mx: {
    marginHorizontal: 15,
  },
  instructionsList: {
    paddingTop: 15,
  },
})
