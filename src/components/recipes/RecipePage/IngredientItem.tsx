import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Checkbox from 'expo-checkbox'
import React, { useState } from 'react'
import { IngredientType } from '../../../config/types/Recipe'
import sv from '../../../config/sv'
import AppText from '../../text/AppText'

type IngredientItemProps = {
  ingredient: IngredientType
}

export default function IngredientItem({ ingredient }: IngredientItemProps) {
  const [isChecked, setIsChecked] = useState(false)

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
            ingredient.quantity ?? ''
          } ${ingredient.measurement.value ?? ''} `}</AppText>
          <AppText style={styles.ingrText} size='mediumSmall'>
            {ingredient.name}
          </AppText>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 30,
    marginVertical: 5,
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
