import React from "react";
import './Header.css'
import {Button, TextField, Typography,InputAdornment, IconButton, Tooltip} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from "react-router-dom";

function Header(){
    const navigate=useNavigate()
    const GitHub=()=>{
      window.location.href=('https://github.com/Worriedhenry/WebNotes')
    }
    return <div className="Header-Container">
    <h1 align="center" style={{color:'#1976d2',margin:'1%'}} className="heading" mt={0} fontSize={50} component="h1" variant="h5" >WebNotes</h1>
    <p  style={{textAlign:'right'}}><TextField 
    inputProps={{
    style: {
      height: "3.5px",
      width:'18vw',
      textAlign:'center'
    },
    startAdornment: (
        <InputAdornment position="start">
          <SearchIcon/>
        </InputAdornment>
      )
      
  }} label="Search Notes"></TextField><IconButton color="primary" variant='contained'><SearchIcon /></IconButton></p>
  <div className="Header-Profiles">
    <Tooltip title="Refresh"><IconButton color="primary"><RefreshIcon/></IconButton></Tooltip>
    <Tooltip title="Dark Mode"><IconButton color="primary"><DarkModeIcon/></IconButton></Tooltip>
    <Tooltip title="Profile"><Button color="primary">About us</Button></Tooltip>
    <Tooltip title="Profile"><Button color="primary" onClick={GitHub}>Contribute Code</Button></Tooltip>
    <Tooltip title="Profile"><Button color="primary">Profile</Button></Tooltip>
  </div>
    </div>
}

export default Header;