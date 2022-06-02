import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../FirebaseConfig/Firebase';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] =  useState()

  function signup(email, password, name) {
    console.log(email, password, name);
    createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      // updateProfile(userCredentials.user, name);
      if(userCredentials.user) {
        updateProfile(userCredentials.user, {
          displayName: name
        })
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      // dispatch({ type: "LOGIN", payload: res.user });
      return res
    })
    .catch((err) => {
      if (err.code === "auth/") {
        return "The password you entered does not match to this user.";
      }
      else {
        return err.message;
      }
    });
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
