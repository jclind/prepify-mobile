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

type IngredientsProps = {
  servings: number
  setServings: (servings) => void
  recipe: RecipeType
}

export default function Ingredients({
  servings,
  setServings,
  recipe,
}: IngredientsProps) {
  const [modIngredients, setModIngredients] = useState<IngredientsListType[]>(
    []
  )

  useEffect(() => {
    if (servings === Number(recipe.yield.value)) {
      setModIngredients(recipe.ingredients)
    } else {
      setModIngredients(
        updateIngredients(
          recipe.ingredients,
          Number(recipe.yield.value),
          servings
        )
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
  const renderAllIngredientsLists = () => {
    return modIngredients.map((ingrList, idx) => {
      const isMultiIngrList = recipe.ingredients.length > 1 // true if there is more than one ingredient list
      return (
        <View style={styles.ingredientItem} key={idx}>
          {isMultiIngrList && (
            <SectionListTitle>{ingrList.name}</SectionListTitle>
          )}
          {renderIngredientsList(ingrList)}
        </View>
      )
    })
  }
  const renderIngredientsList = (ingrList: IngredientsListType) => {
    return (
      <View style={recipeStyles.sectionList}>
        {ingrList.list.map(ingr => {
          return <IngredientItem ingredient={ingr} key={ingr.id} />
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
            {`${servings} ${recipe.yield.type.value}`}
          </AppText>
        </View>
        {renderServingsCounter()}
      </View>
      <View style={recipeStyles.sectionListsContainer}>
        {renderAllIngredientsLists()}
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
