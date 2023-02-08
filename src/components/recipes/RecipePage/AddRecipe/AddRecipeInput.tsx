import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import sv from '../../../../config/sv'

type AddRecipeInputType = {
  val: string
  setVal: (val) => void
  numberOfLines?: number
  onEnter?: () => void
  placeholder?: string
  inputRef?: React.RefObject<TextInput>
  onBlur?: () => void
}

export default function AddRecipeInput({
  val,
  setVal,
  numberOfLines = 1,
  onEnter,
  placeholder,
  inputRef,
  onBlur,
}: AddRecipeInputType) {
  const [tempVal, setTempVal] = useState(val)
  return (
    <View>
      <TextInput
        value={tempVal}
        onChangeText={text => setTempVal(text)}
        onEndEditing={() => setVal(tempVal)}
        style={[
          styles.input,
          { minHeight: 20 * numberOfLines, maxHeight: 20 * numberOfLines + 20 },
        ]}
        multiline={numberOfLines > 1}
        numberOfLines={numberOfLines}
        blurOnSubmit={!!onEnter}
        onBlur={onBlur}
        onSubmitEditing={onEnter || null}
        placeholder={placeholder}
        ref={inputRef}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: sv.inputBorderColor,
    borderRadius: sv.borderRadius,
    fontSize: 16,
  },
})
