import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import AddRecipeInput from './AddRecipeInput'
import { InstructionsType } from './addRecipeTypes'
import AddLabelContainer from './AddLabelContainer'
import uuid from 'react-native-uuid'
import * as Haptics from 'expo-haptics'
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist'
import InstructionItem from './InstructionItem'
import AppText from '../../../text/AppText'
import sv from '../../../../config/sv'

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

  const [reorderActive, setReorderActive] = useState(false)

  // Removes given instruction and updates 'index' value by subtracting one to each instruction after the removed index
  const removeInstruction = (removeId: string) => {
    const removedInstructionsArr = instructions.filter(
      instr => instr.id !== removeId
    )
    const removedIdx = instructions.findIndex(instr => instr.id === removeId)
    // If the removed instruction was a label, don't update the index numbers of the following instructions
    const removedElement = instructions[removedIdx]
    if ('label' in removedElement) {
      return setInstructions(removedInstructionsArr)
    }
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
  const editInstruction = (id, updatedItem) => {
    setInstructions(prev =>
      prev.map(instr => (instr.id === id ? updatedItem : instr))
    )
  }

  const handleEnter = () => {
    if (!inputVal) return
    setInputVal('')
    addInstruction({ content: inputVal })
  }
  const handleDragEnd = ({ data }: { data: InstructionsType[] }) => {
    let indexCounter: number = 0

    const indexedData = data.map(ingr => {
      if ('index' in ingr) {
        indexCounter++
        return { ...ingr, index: indexCounter }
      }
      return ingr
    })
    setInstructions(indexedData)
  }

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <InstructionItem
          key={item.id}
          instr={item}
          removeInstruction={removeInstruction}
          editInstruction={editInstruction}
          reorderActive={true}
          drag={drag}
          isActive={isActive}
        />
      </ScaleDecorator>
    )
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => setReorderActive(!reorderActive)}
        style={styles.reorderBtn}
      >
        <AppText size='mediumSmall' textColor={sv.primary}>
          {reorderActive ? 'Done' : 'Reorder'}
        </AppText>
      </TouchableOpacity>
      <View style={styles.mx}>
        <AddRecipeInput
          val={inputVal}
          setVal={setInputVal}
          numberOfLines={4}
          onEnter={handleEnter}
        />
      </View>
      <View style={styles.instructionsList}>
        {reorderActive ? (
          <DraggableFlatList
            data={instructions}
            listKey={uuid.v4().toString()}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            onDragEnd={handleDragEnd}
            onScrollOffsetChange={() => Haptics.selectionAsync()}
            onPlaceholderIndexChange={() => Haptics.selectionAsync()}
            onDragBegin={() => Haptics.selectionAsync()}
            scrollEnabled={false}
          />
        ) : (
          <FlatList
            data={instructions}
            listKey={uuid.v4().toString()}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <InstructionItem
                key={item.id}
                instr={item}
                removeInstruction={removeInstruction}
                editInstruction={editInstruction}
                reorderActive={false}
              />
            )}
          />
        )}
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
  reorderBtn: {
    position: 'absolute',
    right: 20,
    top: -25,
  },
  instructionsList: {
    paddingTop: 15,
  },
})
