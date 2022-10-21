import React, { useState, useContext, useEffect } from 'react'
import { auth, db } from '../firebase'

const AuthContext = React.createContext()
export function useAuth() {
  return useContext(AuthContext)
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({})

  const [loading, setLoading] = useState(true)
  // const [buttonState, setButtonState] = useState(true)
  const [firstCard, setFirstCard] = useState(true)

  // const setupGuides = (data) => {
  //   if (data.length) {
  //     const html = ''
  //   } else {
  //     const html = '<h5 class="center-align">Login to see more</h5>'
  //   }
  // }

  // const setupUI = (user) => {
  //   if (user) {
  //     db.collection('users')
  //       .doc(user.uid)
  //       .get()
  //       .then((doc) => {
  //         setCurrentUser(doc)
  //       })
  //     // toggle user UI elements
  //   } else {
  //     setCurrentUser([])
  //     // clear account info
  //   }
  // }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  function logout() {
    return auth.signOut()
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection('users')
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              if (
                user.email === doc.data().email &&
                user.email === 'admin@gmail.com'
              ) {
                setCurrentUser(
                  snapshot.docs.map((doc1) => ({
                    // id: doc1.id,
                    // data: doc1.data(),
                    email: doc1.data().email,
                    name: doc1.data().name,
                    mssv: doc1.data().mssv,
                    sdt: doc1.data().sdt,
                    password: doc1.data().password,
                  }))
                )
                //   snapshot.docs.map((doc1) => ({
                //     ...doc1.data(),
                //   }))
                // )

                // setCurrentUser({ ...doc.data() })
              } else if (
                user.email === doc.data().email &&
                user.email !== 'admin@gmail.com'
              ) {
                // setCurrentUser(doc.data())
                setCurrentUser(doc.data())
              }
            })
          })
      } else {
        setCurrentUser({})
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    firstCard,
  }
  return (
    <>
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    </>
  )
}
