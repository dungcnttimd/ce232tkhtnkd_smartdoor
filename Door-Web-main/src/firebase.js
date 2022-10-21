import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/analytics'
import 'firebase/compat/database'

const app = {
  apiKey: 'AIzaSyAgomNx-n6m5imbgOD60w13cnGu4kIDxj4',
  authDomain: 'ceec-b2cd3.firebaseapp.com',
  databaseURL:
    'https://ceec-b2cd3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'ceec-b2cd3',
  storageBucket: 'ceec-b2cd3.appspot.com',
  messagingSenderId: '858841426124',
  appId: '1:858841426124:web:c0491b5be0408d9464ba69',
  measurementId: 'G-GFMJ253F4F',
}
// export const auth = app.auth()
// export const db = firebase.firestore()
// db.settings({ timestampsInSnapshots: true })

function getFirebaseApp(name, config) {
  let foundApp = firebase.apps.find((app) => app.name === name)
  return foundApp
    ? foundApp
    : firebase.initializeApp(config || firebase.app().options, 'auth-worker')
}
firebase.initializeApp(app)
firebase.auth().signOut()
let authWorkerApp = getFirebaseApp('auth-worker', app)
firebase.analytics()
let authWorkerAuth = firebase.auth(authWorkerApp)

authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE)
// db.settings({ timestampsInSnapshots: true })
export const database = firebase.database()
export const auth = firebase.auth()
export const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
export default app
