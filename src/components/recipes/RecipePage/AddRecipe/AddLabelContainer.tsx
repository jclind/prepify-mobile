import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
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

  const handleEnter = () => {
    if (!isAddLabelVisible || !labelVal) return
    addIngredient({ label: labelVal })
    setLabelVal('')
    setIsAddLabelVisible(false)
  }

  return (
    <>
      {isAddLabelVisible ? (
        <View style={styles.addLabelInputContainer}>
          <AddRecipeInput
            val={labelVal}
            setVal={setLabelVal}
            placeholder='Add Label'
            onEnter={handleEnter}
          />
        </View>
      ) : (
        <View style={styles.addLabelContainer}>
          <TouchableOpacity onPress={() => setIsAddLabelVisible(true)}>
            <AppText size='mediumSmall' textColor={sv.primary}>
              <MCIcons name='plus' size={16} /> Add Label
            </AppText>
          </TouchableOpacity>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  addLabelContainer: {
    paddingTop: 15,
  },
  addLabelInputContainer: {},
})
