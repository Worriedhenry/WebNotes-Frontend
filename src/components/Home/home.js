import React, { useEffect, useState } from 'react';
import { useNavigate,useSearchParams} from 'react-router-dom'
import Cards from '../Cards/Cards';
import axios from 'axios';
import './Home.css'
import { TailSpin } from 'react-loader-spinner'
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Button, ButtonGroup, IconButton} from '@mui/material'
// import { useNavigate } from "react-router-dom";
import UndoIcon from '@mui/icons-material/Undo';

function Home({socket,division,array}) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  // const [arr,setArray]=useState([])
  const [arr,setArray]=useState([])
  const [Prevarr,setPrevArray]=useState(arr)
  const [text,setText]=useState("")
    const [Refresh,setRefresh]=useState(0)
    const [edited,setEdited]=useState('none')
    const [prev,setPrev]=useState(0)
    const [Loader,setLoader]=useState(true)
    function updation(e){
        setText(e)
        setEdited('flex')
    }
    async function FunUpdate(el){
        let result =await axios.put("http://localhost:3001/",{id:el,Text:text,Visiblity:"Public",Phone:searchParams.get("Phone")})
        setEdited('none')
        setRefresh(Refresh+1)
    }
    async function FunDelete(key){
        const data={
            id:key,
            Phone:searchParams.get("Phone")
        }
        let result=await axios.post("http://localhost:3001/del",data)
        setArray(result.data.array)
        setRefresh(Refresh+1)
    }
    socket.on("Changing",(e)=>{
      // console.log(division)
      async function getData(){
        if (!sessionStorage.getItem("CurrentUser")) {
          navigate('/login')
        }        
        const result=await axios.post("http://localhost:3001/", { Phone: searchParams.get("Phone")})
        var array_Reversed=result.data.err
        array_Reversed.reverse()
          if(division===1){
            setArray(array_Reversed)
          }
          else if(division===2){
            var PersonalArray=[]
            array_Reversed.map((e)=>{
              if(e.Format==="Personal"){
                PersonalArray.push(e)
              }
            })
            setArray(PersonalArray)
          }
          else if(division===3){
            var PersonalArray=[]
            array_Reversed.map((e)=>{
              if(e.Format==="Work"){
                PersonalArray.push(e)
              }
            })
            setArray(PersonalArray)
          }
      }
        getData();
    })
    function FunUndo(el){
        setText(el)
        document.getElementById('textArea').value=el
        setEdited('none')
    }

  useEffect(() => {
    // console.log(array)
    setLoader(true)
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
    // console.log("ok")
    setLoader(false)
  },[])
 
  return <>
        {arr.length<1 && <h3 style={{width:"100%",height:'100%',margin:'auto',textAlign:'center',color:"#1976d2"}}>Click on New Note to add Notes</h3>}
        <TailSpin
        height="60"
        width="60"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="0.2"
        wrapperStyle={{}}
        wrapperClass=""
        visible={Loader}
    />
        
    <div className="Home-Grid">
        {array.map((e)=> <Cards key={e._id} id={e._id} Format={e.Format} Phone={searchParams.get("Phone")} Name={searchParams.get("Name")} Text={e.NoteText} socket={socket} Time={e.Time} Color={e.Color}  />)}
    </div>
    </>
}

export default Home;
