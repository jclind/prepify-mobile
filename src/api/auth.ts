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

class AuthAPI {
  private _user = null

  get user() {
    return this._user
  }
  private set user(newUser) {
    this._user = newUser
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password).then(userCredential => {
      this.user = userCredential.user
    })
  }
  async loginWithGoogle() {}
  async loginWithApple() {}

  async signupWithEmailAndPassword(username, email, password) {
    const isAvailable = await this.checkUsernameAvailability(username)
    if (!isAvailable) throw new Error(`${username} has already been taken`)

    createUserWithEmailAndPassword(auth, email, password).then(cred => {
      const uid = cred.user.uid
      this.setUsername(uid, username)
    })
  }

  async setUsername(uid, username) {
    const usernameData = { username }

    const usernamesRef = doc(db, 'username', uid)
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
