import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MCIcons } from '../../config/types/MCIcons'
import sv from '../../config/sv'
import AppText from '../text/AppText'

export default function UserCard() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <MCIcons
          name='account-outline'
          size={35}
          style={styles.accountIcon}
          color={sv.primaryText}
        />
      </View>
      <View style={styles.textContainer}>
        <AppText size='medium' style={styles.name}>
          Jesse Lind
        </AppText>
        <AppText size='small' style={styles.email}>
          Jesseclind@gmail.com
        </AppText>
      </View>
      <MCIcons name='chevron-right' size={28} style={styles.chevronRight} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 70,
    width: 70,

    backgroundColor: sv.tertiaryBackground,
    borderRadius: 35,

    marginRight: 15,
  },
  accountIcon: {
    textAlign: 'center',
  },
  textContainer: { flex: 1 },
  name: {
    fontFamily: 'Montserrat_500Medium',
    paddingBottom: 5,
  },
  email: {
    color: sv.secondaryText,
  },
  chevronRight: {
    color: sv.tertiaryText,
  },
})
