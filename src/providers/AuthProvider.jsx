import { createContext, useEffect, useState } from "react";
import {  GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider()

    const signIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
      
    }
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            if(currentUser && currentUser.email){
                const loggedUser = {
                    email: currentUser.email
                }
                fetch('http://localhost:5000/jwt',{
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    }, 
                    body: JSON.stringify(loggedUser)
                })
                .then(res=>res.json())
                .then(data=>{
                    localStorage.setItem('access_token', data.token)
                        
                })
    
            }else{
                
        localStorage.removeItem('access_token')
            }
            setLoading(false)
        })
        return ()=>{
            return unsubscribe()
        }
    },)
    
    const authInfo = {
        user,
        loading,
        signIn,
        logOut,
        googleSignIn,
        createUser,
    }
 
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;