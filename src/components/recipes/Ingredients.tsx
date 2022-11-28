import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import styleVars from '../../config/styleVars'
import { MCIcons } from '../../config/types/MCIcons'
import AppText from '../text/AppText'
import RecipeType, { IngredientsListType } from '../../config/types/Recipe'
import IngredientItem from './IngredientItem'
import { updateIngredients } from '../../util/updateIngredients'

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

  return (
    <View style={styles.ingredientsContainer}>
      <View style={styles.ingredientsContainerHeader}>
        <View style={styles.left}>
          <AppText style={styles.ingredientsTitle} size='medium'>
            Ingredients for
          </AppText>
          <AppText size='mediumSmall' textColor={styleVars.tertiaryText}>
            {`${servings} ${recipe.yield.type.value}`}
          </AppText>
        </View>
        <View style={styles.right}>
          <View style={styles.servingModContainer}>
            <TouchableOpacity
              style={styles.servingsMod}
              onLongPress={decServings}
              delayLongPress={250}
              onPress={decServingsClick}
              onPressOut={stopTimer}
            >
              <MCIcons name='minus' size={18} color={styleVars.primaryText} />
            </TouchableOpacity>
            <AppText style={styles.servingSizeCounter} size='medium'>
              {servings}
            </AppText>
            <TouchableOpacity
              style={styles.servingsMod}
              onPressIn={incServings}
              onPressOut={stopTimer}
            >
              <MCIcons name='plus' size={18} color={styleVars.primaryText} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.ingredientsList}>
        {modIngredients.map((ingrList, idx) => {
          const isMultiIngrList = recipe.ingredients.length > 1 // true if there is more than one ingredient list
          return (
            <View style={styles.ingredientItem} key={idx}>
              {isMultiIngrList && (
                <View style={styles.ingredientsListTitleContainer}>
                  <AppText
                    size='mediumSmall'
                    style={styles.ingredientListTitle}
                  >
                    {ingrList.name}
                  </AppText>
                  <View style={styles.titleDivider} />
                </View>
              )}
              <View style={styles.ingredientList}>
                {ingrList.list.map(ingr => {
                  return <IngredientItem ingredient={ingr} key={ingr.id} />
                })}
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ingredientsContainer: {},
  ingredientsTitle: {
    fontFamily: 'Montserrat_600SemiBold',
    paddingBottom: 5,
  },
  ingredientsContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {},
  right: {},
  servingModContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: styleVars.secondaryBackground,

    borderRadius: styleVars.borderRadius,
  },
  servingsMod: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  servingSizeCounter: {
    width: 25,
    textAlign: 'center',
  },
  ingredientsList: {
    marginTop: 10,
  },
  ingredientItem: {},
  ingredientListTitle: {
    marginBottom: 5,
    color: styleVars.primary,
    fontFamily: 'Montserrat_600SemiBold',
  },
  ingredientsListTitleContainer: {
    marginTop: 25,
  },
  titleDivider: {
    height: 1,
    width: '100%',
    backgroundColor: styleVars.inputBorderColor,
  },
  ingredientList: {
    marginTop: 25,
  },
})
