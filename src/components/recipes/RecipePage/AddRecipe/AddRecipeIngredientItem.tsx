import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import React, { useRef, useState } from 'react'
import AppText from '../../../text/AppText'
import { MCIcons } from '../../../../config/types/MCIcons'
import sv from '../../../../config/sv'
import AddRecipeInput from './AddRecipeInput'
import SwipeableDelete from './SwipeableDelete'
import { IngredientResponseType } from '@jclind/ingredient-parser'
import { IngredientsType } from '../../../../../types'

const unknownImagePath =
  'https://spoonacular.com/cdn/ingredients_100x100/uknown.jpg'

type IngredientItemProps = {
  ingr: IngredientsType
  editIngredient: (id: string, updatedItem: IngredientsType) => void
  removeIngredient: (string) => void
  getIngredientData: (val: string) => Promise<IngredientResponseType>
  drag?: any
  isActive?: any
  reorderActive: boolean
}

const Label = ({ id, label }: { id: string; label: string }) => {
  return (
    <View style={styles.ingredientLabel} key={id}>
      <AppText size='mediumSmall' style={styles.labelText}>
        {label}
      </AppText>
    </View>
  )
}
const Ingredient = ({ ingr }: { ingr: IngredientsType }) => {
  if ('ingredientData' in ingr) {
    const { imagePath } = ingr.ingredientData ?? {}
    const { comment, ingredient, quantity, unit } = ingr.parsedIngredient ?? {}

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
            {ingredient}
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
  return null
}

export default function AddRecipeIngredientItem({
  ingr,
  removeIngredient,
  drag,
  isActive,
  reorderActive,
  editIngredient,
  getIngredientData,
}: IngredientItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedVal, setEditedVal] = useState(() => {
    if ('label' in ingr) return ingr.label
    return ingr.parsedIngredient.originalIngredientString
  })
  const [loading, setLoading] = useState(false)
  const editInputRef = useRef<TextInput>()

  const handleInstructionPress = () => {
    setIsEditing(true)
    if (editInputRef && editInputRef.current) {
      editInputRef.current.focus()
    }
  }

  const handleEditSubmit = async () => {
    if (!editedVal) {
      if (editInputRef && editInputRef.current) {
        editInputRef.current.blur()
      }
    } else {
      if ('label' in ingr) {
        if (ingr.label !== editedVal) return
        editIngredient(ingr.id, { ...ingr, label: editedVal })
      } else {
        if (ingr.parsedIngredient.originalIngredientString === editedVal) return
        setLoading(true)
        const updatedIngrData: IngredientsType = await getIngredientData(
          editedVal
        )
        editIngredient(ingr.id, { ...updatedIngrData })
        setLoading(false)
      }
    }
  }

  return (
    <TouchableOpacity
      onPressIn={drag}
      onPress={handleInstructionPress}
      disabled={isActive && reorderActive}
    >
      <View style={{ paddingLeft: reorderActive ? 40 : 0 }}>
        {reorderActive && (
          <View style={styles.handler}>
            <MCIcons name='menu' size={30} />
          </View>
        )}
        <View style={isEditing ? { height: 0 } : {}}>
          <SwipeableDelete
            removeItem={() => removeIngredient(ingr.id)}
            disabled={reorderActive}
          >
            <View style={styles.ingredientsContainer}>
              {'label' in ingr ? (
                <Label id={ingr.id} label={ingr.label} />
              ) : (
                <Ingredient ingr={ingr} />
              )}
            </View>
          </SwipeableDelete>
        </View>
        <View
          style={
            !isEditing
              ? { height: 0, overflow: 'hidden' }
              : { marginHorizontal: 15 }
          }
        >
          <AddRecipeInput
            val={editedVal}
            setVal={setEditedVal}
            inputRef={editInputRef}
            onBlur={() => setIsEditing(false)}
            onEnter={handleEditSubmit}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  handler: {
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    left: 10,
  },
  ingredientsContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // paddingVertical: 20,
    paddingLeft: 15,
    backgroundColor: sv.primaryBackground,
    overflow: 'hidden',
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
  ingredientLabel: {
    paddingVertical: 20,
  },
  labelText: {
    fontFamily: 'Montserrat_700Bold',
  },
})
