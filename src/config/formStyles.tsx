import { StyleSheet } from 'react-native'
import styleVars from './styleVars'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  title: {
    position: 'absolute',
    top: 30,
  },
  form: {
    width: '100%',
    marginBottom: 30,
  },
  submitBtn: {
    marginTop: 15,
    marginBottom: 0,
  },
  forgotPassBtn: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
    padding: 5,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: styleVars.inputBorderColor,
    borderRadius: 25,
  },
  apiBtns: {
    width: '100%',
    marginTop: 30,
    marginBottom: 15,
  },
})
