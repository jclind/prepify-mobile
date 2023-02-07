import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'
import cuisines from '../../../../recipeData/cuisines'
import SearchableDropdown from 'react-native-searchable-dropdown'
import { Picker } from '@react-native-picker/picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import OpenPickerBtn from './OpenPickerBtn'
import AppText from '../../../text/AppText'
import Button from '../../../Button'

type FormPickerProps = {
  items: string[] | number[]
  val: string | number
  setVal: (val) => void
  title: string
}

export default function FormPicker({
  items,
  val,
  setVal,
  title,
}: FormPickerProps) {
  const [tempVal, setTempVal] = useState<string | number>('')
  const [isModalVisible, setModalVisible] = useState(false)
  console.log(items, val, setVal, title)
  return (
    <View>
      <OpenPickerBtn
        val={val || null}
        setModalVisible={setModalVisible}
        title={title}
      />
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
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
              selectedValue={tempVal}
              style={styles.picker}
              onValueChange={itemValue => setTempVal(itemValue)}
            >
              {items.map(item => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
            <Button
              title='Save'
              onPress={() => {
                setVal(tempVal)
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
