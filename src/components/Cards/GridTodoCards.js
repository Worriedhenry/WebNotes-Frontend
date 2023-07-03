import React, { useEffect, useState } from "react";
import './Cards.css'
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckIcon from '@mui/icons-material/Check';
import { Button,Paper, IconButton, Tooltip, Grid,styled,Typography } from '@mui/material'
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { format, render, cancel, register } from 'timeago.js'
import UndoIcon from '@mui/icons-material/Undo';
import PersonIcon from '@mui/icons-material/Person';
import { BlockPicker, CirclePicker, TwitterPicker } from "react-color";
import { width } from "@mui/system";

const TitleTypography = styled(Typography)(({ theme }) => ({

    fontSize: "small",
    textOverflow: "ellipsis",
    wordWrap: "nowrap",
    [theme.breakpoints.down('sm')]: {
        fontSize: "0.75em",
        textOverflow: "ellipsis",
        wordWrap: "normal",
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
}));
const TextTypography = styled(Typography)(({ theme }) => ({

    fontSize: "small",
    textOverflow: "ellipsis",
    wordWrap: "normal",
    overflow: "hidden",

    [theme.breakpoints.down('sm')]: {
        fontSize: "0.5em",
        MaxWidth: "100%",
        textOverflow: "ellipsis",
        wordWrap: "normal",
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
}));
const StyledButton = styled(IconButton)(({ theme }) => ({
    width: "3vw",
    [theme.breakpoints.down('sm')]: {
        width: "7vw"
    },
}));
export default function GridTodoCars(props) {
    const [Status, setStatus] = useState("Due")

    useEffect(()=>{
        const date=new Date()
        var a=Date.parse(props.Time)
        var b=Date.parse(date)
        if ( props.status==true){
            setStatus("Completed")
        }
        else if(a-b < 0){
            setStatus("Missed")
        }
    },[])
    async function TaskComplete(){
        let result = axios.put("http://localhost:3001/TaskComplete",{id:props.id,Phone:props.Phone})

        
    }
    async function FunDelete(key){
    }
    return (
        <Grid container md={3} sx={{background:"white"}} xs={5} p={0.5} m={0.5}>
            <Grid container md={12}  xs={12} mb={1}  item>
                <Grid md={6} item xs={6} textAlign="left">
                    <TitleTypography sx={{color:"rgb(146, 29, 29)",fontWeight:"bold",fontSize:"1vw"}}>{Status}</TitleTypography>
                </Grid>
                <Grid item md={6} xs={6} textAlign="right">
                    <TitleTypography sx={{color:"green",fontWeight:"bold",fontSize:"1vw"}}>{format(props.Time)}</TitleTypography>
                </Grid>
            </Grid>
            <Grid item xs={12} mb={1}>
                <TitleTypography sx={{fontSize:"1.2vw",color:"#1976d2"}}>{props.Head}</TitleTypography>
            </Grid>
            <Grid item xs={12} sx={{maxHeight:"40%"}}>
                <TextTypography className="truncate">dsnbfjds v  j fj fjb fd jhzd jd dkxj dmxnvjdsf kdsb dsnv dxkdj dknv dxkjd kdn x ndk kdx xfb d kxb db d dkj dhv dk dkjbs ks ksjb kd bkds db fjb fd jhzd jd dkxj dmxnvjdsf kdsb dsnv dxkdj dknv dxkjd kdn x ndk kdx xfb d kxb db d dkj dhv dk dkjbs ks ksjb kd bkd</TextTypography>
            </Grid>
            <Grid container item xs={12} mt={0.5} md={12}>
                <Grid item >
                {Status != "Completed" && <Tooltip title="update"><StyledButton color="primary" className="Cards-Update"  ><BorderColorIcon sx={{height:"100%",width:"100%"}} /></StyledButton></Tooltip>}
                </Grid>
                {Status != "Completed" &&<Grid item>
                 <Tooltip title="Mark Complete"><StyledButton color="success" className="Cards-Update"  onClick={TaskComplete} ><CheckIcon sx={{height:"100%",width:"100%"}} /></StyledButton></Tooltip>
                </Grid>}
                <Grid item>
                {Status == "Completed" && 
                <Tooltip title="Delete">
                    <StyledButton color="error" className="Cards-Update" onClick={FunDelete} ><DeleteIcon sx={{height:"100%",width:"100%"}} /></StyledButton>
                </Tooltip>}
                </Grid>
            </Grid>
        </Grid>
    )
}

