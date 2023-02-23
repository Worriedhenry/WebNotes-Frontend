import React,{useEffect, useState} from "react"
import axios from "axios"
import "./Profile.css"
import { useSearchParams } from "react-router-dom"
import ProCards from "../Cards/ProfileCards"
import { Typography } from "@mui/material"
export default function Profile(){
    const [searchParams,setSearchParams]=useSearchParams()
    const [UserName,setUserName]=useState()
    const [UserNotes,setUserNotes]=useState([])
    const [UserEmail,setUserEmail]=useState()
    useEffect(()=>{
        async function Notes(){
        let Result=await axios.post("http://localhost:3001/profile",{User:searchParams.get("Phone")})
        setUserNotes(Result.data.err.Notes)
        setUserEmail(Result.data.err.Created)
    }
        Notes()
    },[])
    return <div className="flex-center">
        <div className="Pro-Container">
            <div className="UserImage"><img  src="https://media.istockphoto.com/id/1300972574/photo/millennial-male-team-leader-organize-virtual-workshop-with-employees-online.jpg?b=1&s=170667a&w=0&k=20&c=96pCQon1xF3_onEkkckNg4cC9SCbshMvx0CfKl2ZiYs="></img></div>
            <div className="flex-center">
                <div style={{display:"flex",flexDirection:"column",justifyContent:"left"}}>
                <h1 style={{margin:"0px"}} className="left">Ankit Sharma</h1>
                <h3 style={{margin:"0px"}} className="left">Web Developer</h3>
                </div>
                <br/>
                <p className="left">Joined On {UserEmail}</p>
                <br/>
                <p className="left">EMAIL</p>
                <br/>
            </div>
        </div>
            <div>
            <Typography color='primary' style={{color:'white',backgroundColor:'#1976d2'}} mt={2} mb={0.5}>Ankit's Public Notes</Typography>
            <div className="Home-Grid">
        {UserNotes.map((e)=> <ProCards key={e._id} id={e._id} Format={e.Format} Phone={searchParams.get("Phone")} Name={searchParams.get("Name")} Text={e.NoteText} Time={e.Time} Color={e.Color}  />)}
    </div>
            </div>
    </div>
}

