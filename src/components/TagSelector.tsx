import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'
import OpenPickerBtn from './recipes/RecipePage/AddRecipe/OpenPickerBtn'
import Button from './Button'
import AppText from './text/AppText'
import * as Haptics from 'expo-haptics'
import sv from '../config/sv'

type TagSelectorType = {
  tags: string[]
  arr: string[]
  setArr: (val) => void
  title: string
}

export default function TagSelector({
  tags,
  arr,
  setArr,
  title,
}: TagSelectorType) {
  const [tempSelected, setTempSelected] = useState<string[]>(arr)
  const [isModalVisible, setModalVisible] = useState(false)

  const titleVal =
    tempSelected.length > 2
      ? tempSelected.slice(0, 2).join(', ') + ', ...'
      : tempSelected.length > 0
      ? tempSelected.join(', ')
      : null

  const toggleSelectedTag = (arr, tag) => {
    if (arr.includes(tag)) {
      return arr.filter(i => i !== tag)
    }
    return [...arr, tag]
  }

  return (
    <View>
      <OpenPickerBtn
        val={titleVal || null}
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
              {title}
            </AppText>
            <View style={styles.tagsContainer}>
              {tags.map(tag => {
                const isSelected = tempSelected.includes(tag)
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={tag}
                    onPress={() => {
                      Haptics.selectionAsync()
                      setTempSelected(toggleSelectedTag(tempSelected, tag))
                    }}
                  >
                    <View
                      style={
                        isSelected
                          ? [styles.tagButton, styles.selectedTagContainer]
                          : [styles.tagButton]
                      }
                    >
                      <AppText
                        size='mediumSmall'
                        style={
                          isSelected
                            ? [styles.tagText, styles.selectedTag]
                            : [styles.tagText]
                        }
                      >
                        {tag}
                      </AppText>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
            <Button
              title='Save'
              onPress={() => {
                setArr(tempSelected)
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
  pickerTitle: {
    paddingTop: 20,
    paddingLeft: 10,
    fontFamily: 'Montserrat_600SemiBold',
  },
  tagsContainer: {
    paddingTop: 20,
    height: 230,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: sv.inputBorderColor,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    textTransform: 'capitalize',
  },
  selectedTagContainer: {
    backgroundColor: sv.secondary,
    borderColor: sv.secondary,
  },
  selectedTag: {
    color: sv.primaryBackground,
  },
})
