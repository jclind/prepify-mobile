import { StyleSheet, TextInput, View, TextInputProps } from 'react-native'
import React from 'react'
import sv from '../config/sv'
import defaultStyles from '../config/defaultStyles'

type AppTextInputProps = TextInputProps & {
  value: string
  inputRef?: React.RefObject<TextInput> | null

  // onChangeText: (e: string | React.ChangeEvent<any>) => void
  // onSubmitEditing?: () => void
}

export default function AppTextInput({
  placeholder,
  value = '',
  inputRef,
  ...otherProps
}: AppTextInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[defaultStyles.text, styles.input]}
        placeholder={placeholder}
        value={value}
        {...otherProps}
        ref={inputRef}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: sv.inputBorderColor,
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
  },
  input: {
    padding: 15,
    width: '100%',
  },
})
