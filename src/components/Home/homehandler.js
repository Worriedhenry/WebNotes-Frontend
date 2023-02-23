import React,{useState,useEffect} from "react"
import Home from "./home"
import Header from "../Header/Header";
import NewButt from "../NewButton/NewButton";
import { useNavigate,useSearchParams} from 'react-router-dom'
// import Cards from '../Cards/Cards';
import axios from 'axios';
import './Home.css'
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Button, ButtonGroup, IconButton} from '@mui/material'
// import { useNavigate } from "react-router-dom";
import UndoIcon from '@mui/icons-material/Undo';
export default function Handler(){
    const [arr,setArray]=useState([])
    const navigate=useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        async function getData(){
          if (!sessionStorage.getItem("CurrentUser")) {
            navigate('/login')
          }        
          const result=await axios.post("http://localhost:3001/", { Phone: searchParams.get("Phone")})
          var array_Reversed=result.data.err
          setArray(array_Reversed)
        }
          getData();
        
      },[])

      return <><Header/><NewButt />  <Home arrey={arr}/></>
}
