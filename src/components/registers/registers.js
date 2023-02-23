import React,{useState} from "react"
import axios from 'axios'
import Error from "../errors"
import {useNavigate} from 'react-router-dom'
import './register.css'

function Register(){
    const navigate=useNavigate()
    const [Name,setName]=useState('')
    const [phone,setPhone]=useState('')
    const [password,setPassword]=useState('')
    const [cpassword,setCpassword]=useState('')
    const [error,setError]=useState(100)
    const userData={
        name:Name,
        Phone:phone,
        Password:password,
        cpassword:cpassword
    }
    const HandleChange=async ()=>{
        setError(111)
        let result= await axios.post('http://localhost:3001/register',userData)
        setError(result.data.err)
        setName("")
        setPhone("")
        setPassword("")
        setCpassword("")
        if(result.data.err!==200){
            setTimeout(() => setError(100), 3000);
        }
        else{
            navigate(`/login`)
        }
    }
   
    

    return <form onSubmit={e=>e.preventDefault()} className="Register-Container">
    <h1 className="Register-Heading">Register</h1>
    <br/>
    <input className="Register-Name Button-Input" type={"text"} placeholder={"Name"} value={Name} onChange={(e)=>setName(e.target.value)} required></input>
    <br/>
    <input required className="Register-Phone Button-Input" placeholder={"Phone"}  type={"tel"} minLength={10} maxLength={10} value={phone}onChange={(e)=>setPhone(e.target.value)} ></input>
    <br/>
    <input type={"text"} className="Register-Password Button-Input" placeholder={"Password"}  value={password} onChange={(e)=>setPassword(e.target.value)} ></input>
    <br/>
    <input type={"password"} className="Register-Cpassword Button-Input" placeholder={"Confrim Password"}  value={cpassword} onChange={(e)=>setCpassword(e.target.value)} ></input>
    <p>{Error[error]}</p>
    <button onClick={HandleChange} className="Button-Input">Register</button>
    </form>
    
}
export default Register;