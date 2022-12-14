import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FormTitle from './FormTitle'
import { MCIcons } from '../../config/types/MCIcons'
import sv from '../../config/sv'
import FormDescription from './FormDescription'
import formStyles from '../../config/formStyles'
import Button from '../Button'
import { useNavigation } from '@react-navigation/native'
import AppText from '../text/AppText'

type ForgotPasswordSuccessProps = {
  setSuccess: (val) => void
}

export default function ForgotPasswordSuccess({
  setSuccess,
}: ForgotPasswordSuccessProps) {
  const navigation = useNavigation()

  return (
    <>
      <View style={formStyles.titleContainer}>
        <FormTitle>Email Sent</FormTitle>
        <FormDescription>
          Check your inbox for instructions to reset your password.
        </FormDescription>
      </View>
      <Button
        title='Back To 
        Login'
        onPress={() => navigation.goBack()}
        style={styles.loginBtn}
      />
      <View style={styles.resendEmail}>
        <Text>
          <AppText size='small'>
            Can't find the email? Try checking your spam folder or{' '}
          </AppText>
          <TouchableOpacity
            onPress={() => setSuccess(false)}
            style={styles.resendEmailBtn}
          >
            <AppText size='small' style={styles.resendEmailBtnText}>
              try sending again.
            </AppText>
          </TouchableOpacity>
        </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  emailIcon: {
    textAlign: 'center',
  },
  titleContainer: {},

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: sv.secondaryBackground,
    marginTop: 200,
  },
  loginBtn: {
    marginTop: 200,
  },
  resendEmail: {
    position: 'absolute',
    bottom: 15,
  },
  resendEmailBtn: {
    flex: 1,
    // justifyContent: 'flex-end',
  },
  resendEmailBtnText: {
    color: sv.primary,
    fontFamily: 'Montserrat_600SemiBold',
    textDecorationLine: 'underline',
    lineHeight: 78,
  },
})
