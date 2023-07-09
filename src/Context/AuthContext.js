import {createContext ,useEffect,useState} from "react";
import axios from "axios";
const AuthContext=createContext()

function AuthState({children}) {
    const [User,setUser]=useState(null)
    const [Loading,setLoading]=useState(true)
    useEffect(()=>{
        if (localStorage.getItem("User")) {
            axios
              .get("http://localhost:3001/auth/user/"+localStorage.getItem("User"))
              .then(res =>{
                if(res.status==200){
                    setUser(res.data.id)
                }
                setLoading(false)
              } )
              .catch(err => console.error(err));
        } else {
            setLoading(false)
        }
    })
    return(
        <AuthContext.Provider value={{User,setUser,Loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthState,AuthContext}