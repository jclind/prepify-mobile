import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import sv from '../../../config/sv'
import { MCIcons } from '../../../config/types/MCIcons'
import AppText from '../../text/AppText'
import RecipeType, { IngredientsListType } from '../../../config/types/Recipe'
import IngredientItem from './IngredientItem'
import { updateIngredients } from '../../../util/updateIngredients'
import recipeStyles from '../../../config/recipeStyles'
import SectionListTitle from './SectionListTitle'
import SectionTitle from './SectionTitle'
import { IngredientsType } from '../../../../types'

type IngredientsProps = {
  servings: number
  setServings: (servings) => void
  originalServings: number
  ingredients: IngredientsType[]
}

export default function Ingredients({
  servings,
  setServings,
  originalServings,
  ingredients,
}: IngredientsProps) {
  const [modIngredients, setModIngredients] = useState<IngredientsType[]>([])

  useEffect(() => {
    if (servings === originalServings) {
      setModIngredients(ingredients)
    } else {
      setModIngredients(
        updateIngredients(ingredients, originalServings, servings)
      )
    }
  }, [servings])

  const timer = useRef(null)

  const decServingsClick = () => {
    setServings(prev => {
      if (prev > 1) return prev - 1
      return prev
    })
  }

  const decServings = () => {
    decServingsClick()
    timer.current = setTimeout(decServings, 50)
  }

  const incServings = () => {
    setServings(prev => {
      if (prev < 99) return prev + 1
      return prev
    })
    timer.current = setTimeout(incServings, 100)
  }
  const stopTimer = () => {
    clearTimeout(timer.current)
  }

  const renderServingsCounter = () => (
    <View style={styles.servingsCounterContainer}>
      <View style={styles.servingsCounter}>
        <TouchableOpacity
          style={styles.servingsCounterBtn}
          onLongPress={decServings}
          delayLongPress={250}
          onPress={decServingsClick}
          onPressOut={stopTimer}
        >
          <MCIcons name='minus' size={18} color={sv.primaryText} />
        </TouchableOpacity>
        <AppText style={styles.servingSizeCounter} size='medium'>
          {servings}
        </AppText>
        <TouchableOpacity
          style={styles.servingsCounterBtn}
          onPressIn={incServings}
          onPressOut={stopTimer}
        >
          <MCIcons name='plus' size={18} color={sv.primaryText} />
        </TouchableOpacity>
      </View>
    </View>
  )
  const renderIngredientsList = () => {
    return (
      <View style={recipeStyles.sectionList}>
        {ingredients.map(ingr => {
          if ('parsedIngredient' in ingr) {
            return <IngredientItem ingredient={ingr} key={ingr.id} />
          } else {
            return <AppText>{ingr.label}</AppText>
          }
        })}
      </View>
    )
  }

  return (
    <View style={recipeStyles.sectionContainer}>
      <View style={styles.ingredientsContainerHeader}>
        <View>
          <SectionTitle>Ingredients For</SectionTitle>
          <AppText size='mediumSmall' textColor={sv.tertiaryText}>
            {`${servings} servings`}
          </AppText>
        </View>
        {renderServingsCounter()}
      </View>
      <View style={recipeStyles.sectionListsContainer}>
        {renderIngredientsList()}
      </View>
      <View style={recipeStyles.horizontalDivider} />
    </View>
  )
}

const styles = StyleSheet.create({
  ingredientsContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignContent: 'flex-end',
  },
  servingsCounterContainer: {
    justifyContent: 'center',
  },
  servingsCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: sv.secondaryBackground,
    borderRadius: sv.borderRadius,
  },
  servingsCounterBtn: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  servingSizeCounter: {
    width: 25,
    textAlign: 'center',
  },
  ingredientItem: {},
  ingredientListTitle: {
    marginBottom: 5,
    color: sv.primary,
    fontFamily: 'Montserrat_600SemiBold',
  },
})
