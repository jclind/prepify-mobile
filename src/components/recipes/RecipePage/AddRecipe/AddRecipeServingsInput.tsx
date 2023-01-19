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
import OpenPickerBtn from './OpenPickerBtn'

type AddRecipeServingsInputProps = {
  servings: number | null
  setServings: (val) => void
}

export default function AddRecipeServingsInput({
  servings,
  setServings,
}: AddRecipeServingsInputProps) {
  const [modalVisible, setModalVisible] = useState(false)

  const [tempServings, setTempServings] = useState(null)

  let pickerOptions = [<Picker.Item label='-' value={null} key='0' />]
  for (let i = 1; i < 100; i++) {
    pickerOptions.push(<Picker.Item label={i.toString()} value={i} key={i} />)
  }

  return (
    <View>
      <OpenPickerBtn
        val={servings ? `${servings} serving${servings > 1 ? 's' : ''}` : null}
        setModalVisible={setModalVisible}
        title='Add Servings'
      />
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
              selectedValue={tempServings}
              style={styles.picker}
              onValueChange={itemValue => setTempServings(itemValue)}
            >
              {pickerOptions.map(item => item)}
            </Picker>
            <Button
              title='Save'
              onPress={() => {
                setServings(tempServings)
                setModalVisible(false)
              }}
            />
          </View>
        </View>
      </Modal>
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
    height: 365,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
  },
  picker: {
    paddingTop: 20,
    height: 230,
    width: '100%',
  },
  pickerTitle: {
    paddingTop: 20,
    paddingLeft: 10,
    fontFamily: 'Montserrat_600SemiBold',
  },
})
