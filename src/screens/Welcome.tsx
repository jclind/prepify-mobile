import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrepifyLogo from '../components/PrepifyLogo'
import Button from '../components/Button'

export default function Welcome() {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/welcome-screen.jpg')}
      blurRadius={2}
      resizeMode='cover'
    >
      <View style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <PrepifyLogo />
        </View>
        {/* <Text style={[defaultStyles.text, styles.sloganText]}>
          Save money.{'\n'}
          Reduce stress.{'\n'}
          Be healthy.
        </Text> */}
      </View>
      <View style={styles.actionBtns}>
        <Button
          title='Sign Up'
          onPress={() => {
            console.log('clicked')
          }}
          style={styles.button}
        />
        <Button
          title='Login'
          onPress={() => {
            console.log('clicked')
          }}
          backgroundColor={'none'}
          style={styles.button}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0, 0.60)',
  },
  topContainer: {
    position: 'absolute',
    top: 80,
    alignItems: 'center',
  },
  logoContainer: {},
  sloganText: {
    textAlign: 'center',
  },
  actionBtns: {
    padding: 20,
    width: '100%',
  },
  button: {
    marginBottom: 20,
  },
})
