import * as React from 'react'
import axios from 'axios'
import {useState, useEffect, useContext} from "react"

import firebase, {persistenceMode} from '../../config/firebase'


const AuthContext = React.createContext([{}, () => {}])

export const logout = () => firebase.auth().signOut()

export const login = async ({email, password}) => {
    firebase.auth().setPersistence(persistenceMode)

    try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log('LOGIN USER: ', user)
    }
    catch(error) {
        console.log('LOGIN ERROR: ', error)
    }
}

export const signup = async ({email, password, username}) => {
    try {
        const user = await firebase.auth( ).createUserWithEmailAndPassword(email, password)
        await login({email, password})

        console.log('SIGNUP USER: ', user)
        //setupProfile({token, username})

        /*const {data} = await axios({
            method: 'post',
            url: '/api/profile',
            data: {
              username: values.username
            },
            header: {
              'Authentication': `Bearer ${user.getToken()}` 
            }
          })
  
          console.log('Signup User: ', data)*/
    }
    catch (error) {
        console.log('SIGNUP ERROR: ', error)
    }
}

export const useAuth = () => {
    const [auth] = useContext(AuthContext)
    return [auth, {login, logout, signup}]
}


export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        loading: true,
        user:false
    })

    useEffect (() => {
        firebase.auth().onAuthStateChanged(user => {
            setAuth({
                loading: false,
                user
            })
        })
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}