import { StyleSheet, Text, Image, View } from 'react-native'
import React from 'react'
import AppText from '../../../text/AppText'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MCIcons } from '../../../../config/types/MCIcons'
import sv from '../../../../config/sv'

const unknownImagePath =
  'https://spoonacular.com/cdn/ingredients_100x100/uknown.jpg'

type IngredientItemProps = {
  id: string | null
  name: string | null
  quantity: number | null
  unit: string | null
  comment: string | null
  imagePath: string | null
  removeIngredient: (string) => void
}

export default function AddRecipeIngredientItem({
  id,
  name,
  quantity,
  unit,
  comment,
  imagePath,
  removeIngredient,
}: IngredientItemProps) {
  console.log('HEH? 2', name, id)
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: imagePath ? imagePath : unknownImagePath }}
          style={{ height: 50, width: 50 }}
          resizeMode='contain'
        />
      </View>
      <Text style={styles.ingredientText}>
        {quantity > 0 && (
          <AppText size='mediumSmall' style={[styles.text, styles.bold]}>
            {`${quantity} `}
          </AppText>
        )}
        {quantity > 0 && unit ? (
          <AppText size='mediumSmall' style={[styles.text, styles.bold]}>
            {`${unit} `}
          </AppText>
        ) : null}
        <AppText size='mediumSmall' style={styles.text}>
          {name}
        </AppText>
        {comment && (
          <AppText size='mediumSmall' style={styles.text}>
            {`, ${comment}`}
          </AppText>
        )}
      </Text>
      <TouchableOpacity
        onPress={() => {
          removeIngredient(id)
        }}
        style={styles.closeBtn}
      >
        <MCIcons name='close' size={18} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  imgContainer: {
    overflow: 'hidden',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: sv.white,
    borderRadius: 30,
    marginRight: 15,
  },
  ingredientText: {
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    fontFamily: 'Montserrat_500Medium',
  },
  bold: {
    fontFamily: 'Montserrat_700Bold',
  },
  closeBtn: {},
})
