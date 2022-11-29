import { StyleSheet } from 'react-native'
import sv from './sv'

export default StyleSheet.create({
  horizontalDivider: {
    height: 1,
    width: '100%',
    backgroundColor: sv.inputBorderColor,
  },
  sectionContainer: {
    marginTop: 45,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontFamily: 'Montserrat_600SemiBold',
    paddingBottom: 5,
  },
  sectionListsContainer: {
    marginTop: 10,
  },
  sectionList: {
    marginTop: 25,
    marginBottom: 15,
  },
})
