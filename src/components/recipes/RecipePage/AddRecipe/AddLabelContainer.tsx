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

type AddLabelContainerProps = {
  labelVal: string
  setLabelVal: (string) => void
  addToList: (label) => void
}

export default function AddLabelContainer({
  labelVal,
  setLabelVal,
  addToList,
}: AddLabelContainerProps) {
  const [isAddLabelVisible, setIsAddLabelVisible] = useState(false)
  const inputRef = useRef<TextInput>()

  const handleEnter = () => {
    if (!isAddLabelVisible || !labelVal) return
    addToList({ label: labelVal })
    setLabelVal('')
    setIsAddLabelVisible(false)
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.addLabelContainer,
          { height: !isAddLabelVisible ? '100%' : '0%' },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            setIsAddLabelVisible(true)
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
          {
            height: isAddLabelVisible ? '100%' : 0,
          },
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    height: 40,
  },
  addLabelContainer: {
    overflow: 'hidden',
  },
  addLabelInputContainer: {
    overflow: 'hidden',
  },
})
