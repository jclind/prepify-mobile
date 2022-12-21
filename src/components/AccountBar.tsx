import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MCIcons } from '../config/types/MCIcons'
import sv from '../config/sv'

export default function AccountBar() {
  return (
    <View style={styles.accountBar}>
      <View style={styles.accountIcon}>
        <View style={styles.imageContainer}>
          <MCIcons
            name='account-outline'
            size={25}
            style={styles.accountIcon}
            color={sv.primaryText}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  accountBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  accountIcon: {},
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: sv.secondaryBackground,
  },
})
