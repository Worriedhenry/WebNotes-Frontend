import React, { useEffect, useState } from 'react';
import { useNavigate,useSearchParams} from 'react-router-dom'
import Cards from '../Cards/Cards';
import axios from 'axios';
import './Home.css'
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Button, ButtonGroup, IconButton} from '@mui/material'
// import { useNavigate } from "react-router-dom";
import UndoIcon from '@mui/icons-material/Undo';

function Home({socket}) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  // const [arr,setArray]=useState([])
  const [arr,setArray]=useState([])
  const [Prevarr,setPrevArray]=useState(arr)
  const [text,setText]=useState("")
    const [Refresh,setRefresh]=useState(0)
    const [edited,setEdited]=useState('none')
    const [prev,setPrev]=useState(0)
    function updation(e){
        setText(e)
        setEdited('flex')
    }
    async function FunUpdate(el){
        let result = axios.put("http://localhost:3001/",{id:el,Text:text,Visiblity:"Public",Phone:searchParams.get("Phone")})
        setEdited('none')
        setRefresh(Refresh+1)
    }
    async function FunDelete(key){
        const data={
            id:key,
            Phone:searchParams.get("Phone")
        }
        let result=axios.post("http://localhost:3001/del",data)
        setArray(result.data.array)
        setRefresh(Refresh+1)
    }
    socket.on("Changing",(e)=>{
      async function getData(){
        if (!sessionStorage.getItem("CurrentUser")) {
          navigate('/login')
        }        
        const result=await axios.post("http://localhost:3001/", { Phone: searchParams.get("Phone")})
        var array_Reversed=result.data.err
        if(Prevarr!==result.data.err){
        array_Reversed.reverse()
        setArray(array_Reversed)}
      }
        getData();
    })
    function FunUndo(el){
        setText(el)
        document.getElementById('textArea').value=el
        setEdited('none')
    }
  useEffect(() => {
    async function getData(){
      if (!sessionStorage.getItem("CurrentUser")) {
        navigate('/login')
      }        
      const result=await axios.post("http://localhost:3001/", { Phone: searchParams.get("Phone")})
      var array_Reversed=result.data.err
      if(Prevarr!==result.data.err){
      array_Reversed.reverse()
      setArray(array_Reversed)}
    }
      getData();
    console.log("ok")
  },[])
 
  return <>
        {arr.length<1 && <h3 style={{width:"100%",height:'100%',margin:'auto',textAlign:'center',color:"#1976d2"}}>Click on New Note to add Notes</h3>}
    <div className="Home-Grid">
        {arr.map((e)=> <Cards key={e._id} id={e._id} Format={e.Format} Phone={searchParams.get("Phone")} Name={searchParams.get("Name")} Text={e.NoteText} socket={socket} Time={e.Time} Color={e.Color}  />)}
    </div>
    </>
}

export default Home;
