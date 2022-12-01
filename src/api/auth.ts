import { doc } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
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

  async signupWithEmailAndPassword(username, email, password) {}

  async logout() {}

  async forgotPassword() {}
}

export default new AuthAPI()
