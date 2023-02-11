import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { db, auth } from './firebase'

class AuthAPIClass {
  getUID(): string {
    return auth?.currentUser?.uid ?? null
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { error: '' }
    } catch (error) {
      return { error }
    }
  }
  async loginWithGoogle() {}
  async loginWithApple() {}

  async signupWithEmailAndPassword(
    username,
    email,
    password
  ): Promise<{
    error: string
  }> {
    const isAvailable = await this.checkUsernameAvailability(username)
    if (!isAvailable) return { error: `${username} has already been taken` }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      const uid = cred.user.uid
      await this.setUsername(uid, username)
    } catch (error) {
      return { error: error.code }
    }
    return { error: '' }
  }

  async setUsername(uid, username) {
    console.log(4)
    const usernameData = { username }

    const usernamesRef = doc(db, 'username', uid)
    console.log(5)
    return await setDoc(usernamesRef, usernameData)
  }
  async checkUsernameAvailability(username) {
    const usernamesRef = collection(db, 'username')
    const q = query(usernamesRef, where('username', '==', username))

    const usernamesQuerySnapshot = await getDocs(q)
    if (usernamesQuerySnapshot.empty) {
      return true
    }
    return false
  }
  async logout() {
    signOut(auth)
  }

  async forgotPassword(email) {
    sendPasswordResetEmail(auth, email).catch(error => {
      return { error }
    })
    return { error: '' }
  }
}

const AuthAPI = new AuthAPIClass()

export default AuthAPI
