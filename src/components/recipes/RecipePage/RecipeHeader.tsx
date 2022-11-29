import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import sv from '../../../config/sv'
import { useNavigation } from '@react-navigation/native'

import { MCIcons } from '../../../config/types/MCIcons'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
} from 'react-native-reanimated'

const { height } = Dimensions.get('window')

export default function RecipeHeader({ scrollY }) {
  const navigation = useNavigation()

  const [textColor, setTextColor] = useState('black')
  const handleTextColorChange = val => {
    setTextColor(val)
  }

  const containerStyles = useAnimatedStyle(() => {
    const backgroundOpacity = interpolate(
      scrollY.value,
      [0, 150, 300, height],
      [0, 0, 1, 1]
    )

    const hexOpacity = (backgroundOpacity * 255).toString(16).split('.')[0]
    const hexSuffix = (hexOpacity.length === 1 ? 0 : '') + hexOpacity
    const backgroundColor = sv.primaryBackground + hexSuffix
    const borderColor = sv.inputBorderColor + hexSuffix
    return {
      backgroundColor,
      borderColor,
    }
  })
  const iconContainerStyles = useAnimatedStyle(() => {
    const iconBackgroundOpacity = interpolate(
      scrollY.value,
      [0, 200, 300, height],
      [0.5, 0.5, 0, 0]
    )

    const hexOpacity = (iconBackgroundOpacity * 255).toString(16).split('.')[0]
    const backgroundColor =
      sv.black + (hexOpacity.length === 1 ? 0 : '') + hexOpacity
    return {
      backgroundColor,
    }
  })
  useAnimatedStyle(() => {
    const iconBackgroundColor = interpolate(
      scrollY.value,
      [0, 150, 300, height],
      [255, 255, 0, 0]
    )

    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null
    }
    const rgbPrimaryTextVals = hexToRgb(sv.primaryText)

    const calcValue = rgbValue => {
      return (255 / rgbValue) * iconBackgroundColor
    }
    const color = `rgb(${calcValue(rgbPrimaryTextVals.r)}, ${calcValue(
      rgbPrimaryTextVals.g
    )}, ${calcValue(rgbPrimaryTextVals.b)})`
    runOnJS(handleTextColorChange)(color)
    return {
      color,
    }
  })

  return (
    <Animated.View style={[styles.headerContainer, containerStyles]}>
      <Animated.View style={[styles.iconContainer, iconContainerStyles]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MCIcons name={'arrow-left'} size={26} color={textColor} />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.right}>
        <Animated.View style={[styles.iconContainer, iconContainerStyles]}>
          <TouchableOpacity onPress={() => {}}>
            <MCIcons name='bookmark-outline' size={26} color={textColor} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.iconContainer, iconContainerStyles]}>
          <TouchableOpacity onPress={() => {}}>
            <MCIcons name='heart-outline' size={26} color={textColor} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
    paddingHorizontal: 15,
    paddingTop: 50,
    backgroundColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 1,
  },
  right: {
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    borderRadius: 30,
    marginLeft: 10,
  },
})
