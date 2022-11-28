import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Checkbox from 'expo-checkbox'
import React, { useState } from 'react'
import { IngredientType } from '../../config/types/Recipe'
import styleVars from '../../config/styleVars'
import AppText from '../text/AppText'
import recipes from '../../api/recipes'

type IngredientItemProps = {
  ingredient: IngredientType
}

export default function IngredientItem({ ingredient }: IngredientItemProps) {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <TouchableOpacity onPress={() => setIsChecked(prev => !prev)}>
      <View style={styles.ingredientItem}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? styleVars.primary : undefined}
        />
        <Text style={styles.textContainer} numberOfLines={3}>
          <AppText style={styles.quantity} size='mediumSmall'>{`${
            ingredient.quantity ?? ''
          } ${ingredient.measurement.value ?? ''} `}</AppText>
          <AppText style={styles.ingrText} size='mediumSmall'>
            {ingredient.name}
          </AppText>
          {/* <AppText style={styles.price} size={'small'}>
          {' '}
          (${ingredient.price})
        </AppText> */}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 35,
    // maxWidth: '85%',
  },
  checkbox: {
    borderRadius: 8,
    marginRight: 15,
    height: 25,
    width: 25,
  },
  textContainer: { flex: 1 },
  quantity: {
    fontFamily: 'Montserrat_600SemiBold',
  },
  ingrText: {
    color: styleVars.secondaryText,
    fontFamily: 'Montserrat_400Regular',
  },
  price: {
    color: styleVars.primary,
    fontFamily: 'Montserrat_500Medium',
  },
})
