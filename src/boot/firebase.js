import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC3DrbHyn6M8a1mEj4e2rpDo-SGW7X5HBc',
  authDomain: 'nanayings.firebaseapp.com',
  databaseURL: 'https://nanayings.firebaseio.com',
  projectId: 'nanayings',
  storageBucket: 'nanayings.appspot.com',
  messagingSenderId: '595744282241',
  appId: '1:595744282241:web:3f899460761cefd9d69f80'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseDb = firebaseApp.firestore()

export { firebaseApp, firebaseAuth, firebaseDb }
