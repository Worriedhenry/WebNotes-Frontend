import {createContext ,useState} from "react";
const AuthContext=createContext()

function AuthState({children}) {
    const [User,setUser]=useState(null)
    const [Loading,setLoading]=useState(false)
    
    return(
        <AuthState.Provider value={{User,setUser,Loading,setLoading}}>
            {children}
        </AuthState.Provider>
    )
}

export {AuthState,AuthContext}