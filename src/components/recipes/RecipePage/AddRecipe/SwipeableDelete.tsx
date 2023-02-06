import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import { Swipeable } from 'react-native-gesture-handler'
import { MCIcons } from '../../../../config/types/MCIcons'
import sv from '../../../../config/sv'

type SwipeableDeleteProps = {
  removeItem: () => void
  children: React.ReactNode
}

export default function SwipeableDelete({
  removeItem,
  children,
}: SwipeableDeleteProps) {
  const RightActions = ({ progress, dragX, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.swipedRow}
        activeOpacity={1}
      >
        <View>
          <Animated.View style={styles.deleteIconContainer}>
            <MCIcons name='trash-can' size={24} style={styles.deleteIcon} />
          </Animated.View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <RightActions progress={progress} dragX={dragX} onPress={removeItem} />
      )}
    >
      {children}
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  swipedRow: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexShrink: -1,
  },
  animatedInitial: {
    backgroundColor: '#b60000',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    opacity: 0,
  },
  deleteIconContainer: {
    height: '100%',
    backgroundColor: sv.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    width: '100%',
    paddingHorizontal: 20,
    color: sv.primaryBackground,
  },
})
