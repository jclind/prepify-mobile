import {
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  Button,
  Image,
} from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MCIcons } from '../../../../config/types/MCIcons'
import AppText from '../../../text/AppText'
import sv from '../../../../config/sv'

type AddRecipeImageInput = {
  image: string
  setImage: (val) => void
}

export default function AddRecipeImageInput({
  image,
  setImage,
}: AddRecipeImageInput) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <View>
      {/* <Button title='Pick an image from camera roll' onPress={pickImage} /> */}
      {!image ? (
        <TouchableOpacity
          onPress={pickImage}
          style={styles.chooseImageContainer}
          activeOpacity={0.7}
        >
          <MCIcons name='camera-outline' size={30} style={styles.icon} />
          <AppText size='small' style={styles.text}>
            Choose Image
          </AppText>
        </TouchableOpacity>
      ) : (
        <View style={styles.viewImageContainer}>
          <View style={styles.close}>
            <TouchableOpacity
              onPress={() => {
                setImage('')
              }}
            >
              <MCIcons name='close' size={18} color={sv.primaryText} />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode='cover'
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  chooseImageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: sv.secondaryBackground,
    borderRadius: sv.borderRadius,
    overflow: 'hidden',
    height: 200,
  },
  viewImageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    borderRadius: sv.borderRadius,
    overflow: 'hidden',
  },
  icon: {
    textAlign: 'center',
    color: sv.primary,
  },
  text: {
    textAlign: 'center',
    color: sv.primary,
    fontFamily: 'Montserrat_700Bold',
    paddingTop: 10,
  },
  close: {
    position: 'absolute',
    zIndex: 10,
    right: 5,
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: sv.primaryBackground,
  },
  image: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: 200,
  },
})
