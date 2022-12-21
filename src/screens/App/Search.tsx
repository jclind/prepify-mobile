import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import { TextInput } from 'react-native-gesture-handler'
import sv from '../../config/sv'
import { MCIcons } from '../../config/types/MCIcons'
import RecipeAPI from '../../api/recipes'
import AppText from '../../components/text/AppText'

export default function Search() {
  const [searchText, setSearchText] = useState('')

  const [tags, setTags] = useState([])

  useEffect(() => {
    RecipeAPI.getRecipeTags().then(res => {
      setTags(res.data.sort((a, b) => b.count - a.count))
    })
  }, [])

  return (
    <View style={styles.container}>
      <PageTitle style={styles.pageTitle}>Search</PageTitle>
      <View style={styles.searchInputContainer}>
        <MCIcons name='magnify' size={28} style={styles.searchIcon} />
        <TextInput
          value={searchText}
          onChangeText={text => setSearchText(text)}
          style={styles.searchInput}
          placeholder='Search'
        />
      </View>
      <ScrollView
        horizontal={true}
        style={styles.tagScrollView}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.tagsContainer}>
          {tags.map(tag => {
            return (
              <TouchableOpacity style={styles.tagButton}>
                <AppText size='mediumSmall' style={styles.tagText}>
                  {tag.text}
                </AppText>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    textAlign: 'center',
    paddingTop: 55,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    color: sv.secondaryText,
  },
  searchInput: {
    padding: 15,
    paddingLeft: 50,
    borderWidth: 1,
    borderColor: sv.inputBorderColor,
    borderRadius: sv.borderRadius,
    fontSize: 18,
    flex: 1,
  },
  tagScrollView: {
    flexGrow: 0,
  },
  tagsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 15,
    marginLeft: 20,
    // height: 30,
  },
  tagButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: sv.inputBorderColor,
    borderRadius: 15,
    marginRight: 8,
  },
  tagText: {
    textTransform: 'capitalize',
  },
})
