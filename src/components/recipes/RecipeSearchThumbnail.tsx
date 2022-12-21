import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RecipeType from '../../config/types/Recipe'
import { useNavigation } from '@react-navigation/native'

type RecipeSearchThumbnailProps = {
  recipe: RecipeType
}

export default function RecipeSearchThumbnail({
  recipe,
}: RecipeSearchThumbnailProps) {
  return <Text>Hi</Text>
  // <TouchableOpacity
  //   activeOpacity={0.8}
  //   style={styles.container}
  //   onPress={() => navigation.navigate('Recipe', { _id: recipe._id })}
  // >
  //   <View style={styles.imageContainer}>
  //     {!isImgLoaded && <View style={styles.imageLoadingPlaceholder} />}
  //     <Image
  //       source={{ uri: recipe.recipeImage }}
  //       style={styles.recipeImage}
  //       resizeMode='cover'
  //       onLoad={() => setIsImgLoaded(true)}
  //     />
  //   </View>
  //   <View style={styles.content}>
  //     <View style={styles.textContainer}>
  //       <AppText size='medium' style={styles.title} numberOfLines={2}>
  //         {recipe.title}
  //       </AppText>
  //     </View>
  //     {priceText()}
  //     <View style={styles.footerData}>
  //       <TotalTimeElement totalTime={Number(recipe.totalTime)} />
  //       <RatingElement rating={recipe.rating} />
  //     </View>
  //   </View>
  // </TouchableOpacity>
  // )
}

const styles = StyleSheet.create({})
