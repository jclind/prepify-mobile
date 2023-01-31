import { StyleSheet, Text, Image, View } from 'react-native'
import React from 'react'
import AppText from '../../../text/AppText'

const unknownImagePath =
  'https://spoonacular.com/cdn/ingredients_100x100/uknown.jpg'

type IngredientItemProps = {
  _id: string | null
  name: string | null
  quantity: number | null
  unit: string | null
  comment: string | null
  imagePath: string | null
}

export default function AddRecipeIngredientItem({
  _id,
  name,
  quantity,
  unit,
  comment,
  imagePath,
}: IngredientItemProps) {
  console.log('HEH? 2', name, _id)
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  imgContainer: {
    marginRight: 15,
  },
  ingredientText: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Montserrat_500Medium',
  },
  bold: {
    fontFamily: 'Montserrat_700Bold',
  },
})
