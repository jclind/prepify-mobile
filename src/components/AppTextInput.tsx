import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

interface TextInputProps {
  placeholder?: string
  value?: string
  textContentType?: string
  secureTextEntry?: boolean
  autofill?: boolean
  onChangeText: (e: string | React.ChangeEvent<any>) => void
  onSubmitEditing?: () => void
}

export default function AppTextInput({
  placeholder,
  value = '',
  onChangeText,
  onSubmitEditing,
  textContentType = 'none',
  secureTextEntry,
  autofill,
}: TextInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[defaultStyles.text, styles.input]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
        autofill={autofill}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.inputBorderColor,
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    marginVertical: 15,
  },
  input: {
    padding: 15,
    width: '100%',
  },
})
