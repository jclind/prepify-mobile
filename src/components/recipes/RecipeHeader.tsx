import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import sv from '../../config/sv'
import { useNavigation } from '@react-navigation/native'

import { MCIcons } from '../../config/types/MCIcons'
import Animated from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function RecipeHeader({
  containerStyles,
  iconContainerStyles,
  textColor,
}) {
  const navigation = useNavigation()
  return (
    <Animated.View style={[styles.headerContainer, containerStyles]}>
      <Animated.View style={[styles.iconContainer, iconContainerStyles]}>
        <MaterialCommunityIcons
          name={'arrow-left'}
          size={26}
          color={textColor}
          onPress={() => navigation.goBack()}
        />
      </Animated.View>
      <View style={styles.right}>
        <Animated.View style={[styles.iconContainer, iconContainerStyles]}>
          <MCIcons name='bookmark-outline' size={26} color={textColor} />
        </Animated.View>
        <Animated.View style={[styles.iconContainer, iconContainerStyles]}>
          <MCIcons name='heart-outline' size={26} color={textColor} />
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
    // backgroundColor: sv.primaryBackground,
    backgroundColor: 'rgba(0,0,0,0)',
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
