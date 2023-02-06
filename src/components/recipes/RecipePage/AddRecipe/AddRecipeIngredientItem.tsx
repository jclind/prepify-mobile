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
import { IngredientsType } from './addRecipeTypes'
import AddRecipeInput from './AddRecipeInput'
import SwipeableDelete from './SwipeableDelete'

const unknownImagePath =
  'https://spoonacular.com/cdn/ingredients_100x100/uknown.jpg'

type IngredientItemProps = {
  ingr: IngredientsType
  removeIngredient: (string) => void
  drag: any
  isActive: any
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
}: IngredientItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedVal, setEditedVal] = useState('')
  const editInputRef = useRef<TextInput>()

  const handleEditSubmit = () => {}

  return (
    <TouchableOpacity onLongPress={drag} disabled={isActive}>
      <View style={isEditing ? { height: 0 } : {}}>
        <SwipeableDelete removeItem={() => removeIngredient(ingr.id)}>
          <View style={styles.ingredientsContainer}>
            {'label' in ingr ? (
              <Label id={ingr.id} label={ingr.label} />
            ) : (
              <Ingredient ingr={ingr} />
            )}
          </View>
        </SwipeableDelete>
      </View>
      <View style={!isEditing ? { height: 0, overflow: 'hidden' } : {}}>
        <AddRecipeInput
          val={editedVal}
          setVal={setEditedVal}
          inputRef={editInputRef}
          onBlur={() => setIsEditing(false)}
          onEnter={handleEditSubmit}
        />
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
