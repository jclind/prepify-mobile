import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AppText from '../../../text/AppText'
import { Picker } from '@react-native-picker/picker'
import { MCIcons } from '../../../../config/types/MCIcons'
import sv from '../../../../config/sv'
import Button from '../../../Button'

type AddRecipeServingsInputProps = {
  servings: number | null
  setServings: (val) => void
}

export default function AddRecipeServingsInput({
  servings,
  setServings,
}: AddRecipeServingsInputProps) {
  const [modalVisible, setModalVisible] = useState(false)

  let pickerOptions = []
  for (let i = 1; i < 100; i++) {
    pickerOptions.push(<Picker.Item label={i.toString()} value={i} key={i} />)
  }

  return (
    <View>
      <View style={styles.addServingsBtnContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.addServingsBtn}>
            <MCIcons name='plus' size={22} color={sv.primary} />
            <AppText size='mediumSmall' style={styles.addServingsBtnText}>
              Add Servings
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <AppText size='medium' style={styles.pickerTitle}>
              Number Of Servings
            </AppText>
            <Picker
              selectedValue={servings}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setServings(itemValue)}
            >
              {pickerOptions.map(item => item)}
            </Picker>
            <Button
              title='Save'
              onPress={() => setModalVisible(false)}
              style={styles.saveBtn}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  addServingsBtnContainer: {
    width: 150,
  },
  addServingsBtn: {
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
  },
  addServingsBtnText: {
    paddingLeft: 5,
    color: sv.primary,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    height: '40%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  picker: {
    paddingTop: 20,
    height: 240,
    width: '100%',
  },
  pickerTitle: {
    paddingTop: 20,
    paddingLeft: 10,
    fontFamily: 'Montserrat_600SemiBold',
  },
  saveBtn: {},
})
