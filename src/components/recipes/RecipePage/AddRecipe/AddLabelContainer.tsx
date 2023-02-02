import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useRef, useState } from 'react'
import sv from '../../../../config/sv'
import { MCIcons } from '../../../../config/types/MCIcons'
import AppText from '../../../text/AppText'
import AddRecipeInput from './AddRecipeInput'
import { IngredientsType } from '../../../../screens/App/AddRecipe'

type AddLabelContainerProps = {
  labelVal: string
  setLabelVal: (string) => void
  addIngredient: (label) => void
}

export default function AddLabelContainer({
  labelVal,
  setLabelVal,
  addIngredient,
}: AddLabelContainerProps) {
  const [isAddLabelVisible, setIsAddLabelVisible] = useState(false)
  const inputRef = useRef<TextInput>()

  const handleEnter = () => {
    if (!isAddLabelVisible || !labelVal) return
    addIngredient({ label: labelVal })
    setLabelVal('')
    setIsAddLabelVisible(false)
  }

  return (
    <>
      <View
        style={[
          styles.addLabelContainer,
          { height: !isAddLabelVisible ? '100%' : '0%' },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            setIsAddLabelVisible(true)
            console.log(inputRef)
            if (inputRef && inputRef.current) {
              inputRef.current.focus()
            }
          }}
        >
          <AppText size='mediumSmall' textColor={sv.primary}>
            <MCIcons name='plus' size={16} /> Add Label
          </AppText>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.addLabelInputContainer,
          { height: isAddLabelVisible ? '100%' : '0%' },
        ]}
      >
        <AddRecipeInput
          val={labelVal}
          setVal={setLabelVal}
          placeholder='Add Label'
          onEnter={handleEnter}
          inputRef={inputRef}
          onBlur={() => {
            setIsAddLabelVisible(false)
            setLabelVal('')
          }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  addLabelContainer: {
    paddingTop: 15,
  },
  addLabelInputContainer: {},
})
