import { StyleSheet } from 'react-native'
import styleVars from './styleVars'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    position: 'absolute',
    top: 30,
    width: '100%',
  },
  title: {
    width: '100%',
  },
  description: {
    marginTop: 15,
    color: styleVars.tertiaryText,
  },
  form: {
    width: '100%',
    marginBottom: 30,
  },
  submitBtn: {
    marginTop: 10,
    marginBottom: 0,
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
