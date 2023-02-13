import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Checkbox from 'expo-checkbox'
import React, { useState } from 'react'
import sv from '../../../config/sv'
import AppText from '../../text/AppText'
import { IngredientsType } from '../../../../types'
import SectionListTitle from './SectionListTitle'

type IngredientItemProps = {
  ingredient: IngredientsType
}

export default function IngredientItem({ ingredient }: IngredientItemProps) {
  if ('parsedIngredient' in ingredient) {
    const [isChecked, setIsChecked] = useState(false)

    const {
      quantity,
      unit,
      ingredient: ingredientName,
    } = ingredient.parsedIngredient

    return (
      <TouchableWithoutFeedback onPress={() => setIsChecked(prev => !prev)}>
        <View
          style={
            isChecked
              ? [styles.ingredientItem, styles.checked]
              : styles.ingredientItem
          }
        >
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? sv.primary : undefined}
          />
          <Text style={styles.textContainer} numberOfLines={3}>
            <AppText style={styles.quantity} size='mediumSmall'>{`${
              quantity ?? ''
            } ${unit ?? ''} `}</AppText>
            <AppText style={styles.ingrText} size='mediumSmall'>
              {ingredientName}
            </AppText>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  } else {
    return <SectionListTitle>{ingredient.label}</SectionListTitle>
  }
}

const styles = StyleSheet.create({
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 30,
  },
  checkbox: {
    borderRadius: 5,
    height: 22,
    width: 22,
    marginRight: 15,
  },
  checked: {
    opacity: 0.6,
  },
  textContainer: { flex: 1 },
  quantity: {
    fontFamily: 'Montserrat_600SemiBold',
  },
  ingrText: {
    color: sv.secondaryText,
    fontFamily: 'Montserrat_400Regular',
  },
  price: {
    color: sv.primary,
    fontFamily: 'Montserrat_500Medium',
  },
})
