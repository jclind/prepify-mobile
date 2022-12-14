import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useRef, useState } from 'react'
import * as yup from 'yup'

import Screen from '../../components/layout/Screen'
import FormField from '../../components/forms/FormField'
import SubmitButton from '../../components/forms/SubmitButton'
import Divider from '../../components/Divider'
import ApiSignupButton from '../../components/forms/ApiSignupButton'
import formStyles from '../../config/formStyles'
import Form from '../../components/forms/Form'
import SecondarySubmitButton from '../../components/forms/SecondarySubmitButton'
import FormTitle from '../../components/forms/FormTitle'
import FormDescription from '../../components/forms/FormDescription'
import AuthAPI from '../../api/auth'
import { useAuth } from '../../contexts/AuthContext'
import DismissKeyboard from '../../components/DismissKeyboard'
import ErrorMessage from '../../components/forms/ErrorMessage'

interface LoginFormValues {
  [key: string]: string
  email: string
  password: string
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
}

const validationSchema = yup.object().shape({
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(4).label('Password'),
})

export default function Login({ navigation }) {
  const [error, setError] = useState('')
  const passwordRef = useRef<TextInput>(null)
  const { isAuthStatusLoading, setIsAuthStatusLoading } = useAuth()

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    setError('')
    if (isAuthStatusLoading) return
    setIsAuthStatusLoading(true)
    await AuthAPI.loginWithEmailAndPassword(email, password)
      .then(res => {
        if (res.error) {
          setError(res.error)
        }
      })
      .catch(error => {
        console.log('heh??', error)
      })
    setIsAuthStatusLoading(false)
  }

  return (
    <DismissKeyboard>
      <Screen style={formStyles.container}>
        <View style={formStyles.titleContainer}>
          <FormTitle style={formStyles.title}>Login</FormTitle>
          <FormDescription>Please sign in to continue.</FormDescription>
        </View>
        <Form
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={validationSchema}
          style={formStyles.form}
        >
          <ErrorMessage error={error} visible={!!error} />
          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            name='email'
            placeholder='Email'
            textContentType='emailAddress'
            keyboardType='email-address'
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
          <SubmitButton
            title='Login'
            style={formStyles.submitBtn}
            loading={isAuthStatusLoading}
          />

          <SecondarySubmitButton
            text={'Forgot Password?'}
            onPress={() => navigation.push('ForgotPassword')}
          />
        </Form>
        <Divider text='or' />
        <View style={formStyles.apiBtns}>
          <ApiSignupButton iconName={'google'} text={'Continue with Google'} />
          <ApiSignupButton iconName={'apple'} text={'Continue with Apple'} />
        </View>
      </Screen>
    </DismissKeyboard>
  )
}
