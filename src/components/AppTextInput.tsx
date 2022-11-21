import { StyleSheet, TextInput, View, TextInputProps } from 'react-native'
import React from 'react'
import styleVars from '../config/styleVars'
import defaultStyles from '../config/defaultStyles'

type AppTextInputProps = TextInputProps & {
  value: string
  // onChangeText: (e: string | React.ChangeEvent<any>) => void
  // onSubmitEditing?: () => void
}

export default function AppTextInput({
  placeholder,
  value = '',
  // onChangeText,
  // onSubmitEditing,
  ...otherProps
}: AppTextInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[defaultStyles.text, styles.input]}
        placeholder={placeholder}
        value={value}
        {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: styleVars.inputBorderColor,
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
  },
  input: {
    padding: 15,
    width: '100%',
  },
})
