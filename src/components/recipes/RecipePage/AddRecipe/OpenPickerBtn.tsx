import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppText from '../../../text/AppText'
import sv from '../../../../config/sv'
import { MCIcons } from '../../../../config/types/MCIcons'

type OpenPickerBtnProps = {
  val: string | number
  setModalVisible: (val: boolean) => void
  title: string
}

export default function OpenPickerBtn({
  val,
  setModalVisible,
  title,
}: OpenPickerBtnProps) {
  return (
    <View style={styles.addServingsBtnContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.addServingsBtn}>
          {val ? (
            <AppText size='mediumSmall' style={styles.numberOfServings}>
              {val}
            </AppText>
          ) : (
            <>
              <MCIcons name='plus' size={22} color={sv.primary} />
              <AppText size='mediumSmall' style={styles.addServingsBtnText}>
                {title}
              </AppText>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  addServingsBtnContainer: {
    // width: 150,
  },
  addServingsBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 2,
  },
  addServingsBtnText: {
    paddingLeft: 5,
    color: sv.primary,
  },
  numberOfServings: {
    color: sv.primary,
  },
})
