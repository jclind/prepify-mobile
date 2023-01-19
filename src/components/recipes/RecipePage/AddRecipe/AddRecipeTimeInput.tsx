import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'
import Button from '../../../Button'
import { Picker } from '@react-native-picker/picker'
import { MCIcons } from '../../../../config/types/MCIcons'
import AppText from '../../../text/AppText'
import OpenPickerBtn from './OpenPickerBtn'
import sv from '../../../../config/sv'

type AddRecipePrepTimeInputProps = {
  time: { hours: number; minutes: number } | null
  setTime: (val: { hours: number; minutes: number }) => void
}

let hourPickerOptions = []
for (let i = 0; i < 24; i++) {
  hourPickerOptions.push(<Picker.Item label={i.toString()} value={i} key={i} />)
}
let minutePickerOptions = []
for (let i = 0; i < 60; i++) {
  minutePickerOptions.push(
    <Picker.Item label={i.toString()} value={i} key={i} />
  )
}

export default function AddRecipeTimeInput({
  time,
  setTime,
}: AddRecipePrepTimeInputProps) {
  const [modalVisible, setModalVisible] = useState(false)

  const [tempHours, setTempHours] = useState(time?.hours || 0)
  const [tempMinutes, setTempMinutes] = useState(time?.minutes || 0)

  const pickerHours = time?.hours
    ? `${time.hours} hour${time.hours > 1 ? 's' : ''}`
    : ''
  const pickerMinutes = time?.minutes
    ? `${time.minutes} minute${time.minutes > 1 ? 's' : ''}`
    : ''
  const pickerHoursMinutes =
    pickerHours && pickerMinutes
      ? `${pickerHours}, ${pickerMinutes}`
      : pickerHours
      ? pickerHours
      : pickerMinutes
      ? pickerMinutes
      : ''

  console.log(pickerHours, pickerMinutes, pickerHoursMinutes)

  return (
    <View>
      <OpenPickerBtn
        val={pickerHoursMinutes}
        setModalVisible={setModalVisible}
        title='Add Time'
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
              Prep Time
            </AppText>
            <View style={styles.pickersContainer}>
              <View style={styles.singlePickerContainer}>
                <Picker
                  selectedValue={tempHours}
                  style={styles.picker}
                  onValueChange={itemValue => setTempHours(itemValue)}
                  prompt='test'
                >
                  {hourPickerOptions.map(item => item)}
                </Picker>
                <AppText size='mediumSmall' style={styles.pickerLabel}>
                  Hrs.
                </AppText>
              </View>
              <View style={styles.singlePickerContainer}>
                <Picker
                  selectedValue={tempMinutes}
                  style={styles.picker}
                  onValueChange={itemValue => setTempMinutes(itemValue)}
                  prompt='test'
                >
                  {minutePickerOptions.map(item => item)}
                </Picker>
                <AppText size='mediumSmall' style={styles.pickerLabel}>
                  Mins.
                </AppText>
              </View>
            </View>
            <Button
              title='Save'
              onPress={() => {
                setTime({ hours: tempHours, minutes: tempMinutes })
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
  pickersContainer: {
    flexDirection: 'row',
  },
  singlePickerContainer: {
    flexDirection: 'row',
    width: '50%',
    height: '100%',
  },
  picker: {
    paddingTop: 20,
    height: 230,
    width: '100%',
    marginRight: 30,
  },
  pickerLabel: {
    position: 'absolute',
    top: '52%',
    left: '60%',
    color: sv.secondaryText,
  },
  pickerTitle: {
    paddingTop: 20,
    paddingLeft: 10,
    fontFamily: 'Montserrat_600SemiBold',
  },
})
