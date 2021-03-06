import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB,
  projectId: import.meta.env.VITE_FIREBASE_PID,
  storageBucket: import.meta.env.VITE_FIREBASE_SB,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
}

firebase.initializeApp(CONFIG)

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

const { currentUser } = auth as { currentUser: { uid: string } }

export {
  db,
  currentUser,
  auth,
  storage,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
}
