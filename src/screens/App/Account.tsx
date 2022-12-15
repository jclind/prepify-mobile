import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../../components/layout/Screen'
import Button from '../../components/Button'
import AuthAPI from '../../api/auth'
import sv from '../../config/sv'
import UserCard from '../../components/account/UserCard'
import FormTitle from '../../components/forms/FormTitle'
import SettingsListItem from '../../components/account/SettingsListItem'
import AppText from '../../components/text/AppText'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type SectionItem = {
  title: string
  iconName: keyof typeof MaterialCommunityIcons.glyphMap
  action?: () => void | string
}

const accountLinkLayout: { sectionTitle: string; items: SectionItem[] }[] = [
  {
    sectionTitle: 'support',
    items: [
      { title: 'feedback', iconName: 'information-outline' },
      { title: 'help', iconName: 'help-circle-outline' },
    ],
  },
  {
    sectionTitle: 'login',
    items: [
      {
        title: 'logout',
        iconName: 'logout',
        action: () => {
          AuthAPI.logout()
        },
      },
    ],
  },
]

export default function Account() {
  const handleLogout = () => {}

  return (
    <View style={styles.container}>
      <FormTitle style={styles.pageTitle}>Account</FormTitle>
      <View style={styles.section}>
        <UserCard />
      </View>
      {accountLinkLayout.map(section => {
        return (
          <>
            <AppText size='small' style={styles.sectionTitle}>
              {section.sectionTitle}
            </AppText>
            <View style={styles.section}>
              {section.items.map((item, idx) => {
                return (
                  <>
                    <SettingsListItem
                      iconName={item.iconName}
                      title={item.title}
                      action={item.action}
                    />
                    {idx < section.items.length - 1 && (
                      <View style={styles.itemDivider}>
                        <View style={styles.itemDividerLine} />
                      </View>
                    )}
                  </>
                )
              })}
            </View>
          </>
        )
      })}

      <Button title='Logout' onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 55,
    backgroundColor: sv.secondaryBackground,
  },
  section: {
    backgroundColor: sv.primaryBackground,
    paddingVertical: 5,
    paddingLeft: 15,
    borderRadius: sv.borderRadius,
    marginBottom: 35,
  },
  sectionTitle: {
    paddingBottom: 5,
    paddingLeft: 20,
    color: sv.secondaryText,
    textTransform: 'uppercase',
  },
  itemDivider: {
    width: '100%',
    marginVertical: 5,
    paddingLeft: 39,
  },
  itemDividerLine: {
    height: 1,
    width: '100%',
    backgroundColor: sv.inputBorderColor,
    alignSelf: 'flex-end',
  },
  pageTitle: {
    textAlign: 'center',
    marginBottom: 35,
  },
})
