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
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { db, auth } from './firebase'
import { User as FirebaseUser } from 'firebase/auth'

class AuthAPI {
  // private _user: FirebaseUser | null = null

  // get user() {
  //   return this._user
  // }
  // private set user(newUser) {
  //   console.log('why man?')
  //   this._user = newUser
  // }

  async loginWithEmailAndPassword(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password).then(userCredential => {
      // console.log('here?')
      // this.user = userCredential.user
    })
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
    console.log(1)
    const isAvailable = await this.checkUsernameAvailability(username)
    if (!isAvailable) return { error: `${username} has already been taken` }
    console.log(2)
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    console.log(cred)
    const uid = cred.user.uid
    console.log(3)
    await this.setUsername(uid, username)
    console.log(6)
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

  async forgotPassword() {}
}

export default new AuthAPI()
