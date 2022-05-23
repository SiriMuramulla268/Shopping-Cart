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
    createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      // dispatch({ type: "LOGIN", payload: res.user });
      return console.log(res)
    })
    .catch((err) => {
      if (err.code === "auth/") {
        return "The password you entered does not match to this user.";
        // console.log("The password you entered does not match to this user.")
        // setError("The password you entered does not match to this user.");
      }
      else {
        // return err.message;
        console.log(err.message);
        // setError(err.message);
      }
    });
    // .finally(() => {
    //   setIsPending(false);
    // });
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
