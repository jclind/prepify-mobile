import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AddRecipeInput from './AddRecipeInput'
import { InstructionsType } from './addRecipeTypes'
import AddLabelContainer from './AddLabelContainer'
import uuid from 'react-native-uuid'

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

  const addInstruction = data => {
    const instructionData: InstructionsType = { ...data, id: uuid.v4() }
    setInstructions(prev => [...prev, instructionData])
  }

  return (
    <View style={styles.container}>
      <AddRecipeInput val={inputVal} setVal={setInputVal} numberOfLines={4} />
      <AddLabelContainer
        labelVal={labelVal}
        setLabelVal={setLabelVal}
        addToList={addInstruction}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
})
