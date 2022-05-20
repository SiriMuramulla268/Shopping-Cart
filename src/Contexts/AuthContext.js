import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../FirebaseConfig/Firebase';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] =  useState()

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return unsubscribe
  },[])
  
  const value = {
    currentUser,
    login,
    signup
  }
  
  return (
    //value contains the value which provide for authentication
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
