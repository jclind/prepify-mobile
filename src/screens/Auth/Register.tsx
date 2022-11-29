import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native'
import React, { useRef } from 'react'

import Screen from '../../components/layout/Screen'
import TextLarge from '../../components/text/TextLarge'
import sv from '../../config/sv'
import SubmitButton from '../../components/forms/SubmitButton'
import FormField from '../../components/forms/FormField'
import * as yup from 'yup'
import Divider from '../../components/Divider'
import ApiSignupButton from '../../components/forms/ApiSignupButton'
import formStyles from '../../config/formStyles'
import Form from '../../components/forms/Form'
import FormTitle from '../../components/forms/FormTitle'
import FormDescription from '../../components/forms/FormDescription'

interface RegisterFormValues {
  [key: string]: string
  username: string
  email: string
  password: string
}
const initialValues: RegisterFormValues = {
  username: '',
  email: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().required().label('Username'),
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(4).label('Password'),
})

export default function Register() {
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  return (
    <Screen style={formStyles.container}>
      <View style={formStyles.titleContainer}>
        <FormTitle style={formStyles.title}>Create Account</FormTitle>
        <FormDescription>
          Please enter your information below to create a new account.
        </FormDescription>
      </View>
      <Form
        initialValues={initialValues}
        onSubmit={() => console.log('form submitted')}
        validationSchema={validationSchema}
        style={formStyles.form}
      >
        <FormField
          autoCapitalize='none'
          autoCorrect={false}
          name='username'
          placeholder='Username'
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <FormField
          autoCapitalize='none'
          autoCorrect={false}
          name='email'
          placeholder='Email'
          textContentType='emailAddress'
          keyboardType='email-address'
          inputRef={emailRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <FormField
          autoCapitalize='none'
          autoCorrect={false}
          name='password'
          placeholder='Password'
          inputRef={passwordRef}
          secureTextEntry
        />
        <SubmitButton title='Create an Account' style={formStyles.submitBtn} />
      </Form>
      <Divider text='or' />
      <View style={formStyles.apiBtns}>
        <ApiSignupButton iconName={'google'} text={'Continue with Google'} />
        <ApiSignupButton iconName={'apple'} text={'Continue with Apple'} />
      </View>
    </Screen>
  )
}
