import { Dialog } from "@mui/material";
import React,{useState} from "react";
import './Cards.css'
import axios from "axios";
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import GroupsIcon from '@mui/icons-material/Groups';
import {Button, ButtonGroup, IconButton, Tooltip} from '@mui/material'
// import { useNavigate } from "react-router-dom";
import { format, render, cancel, register } from 'timeago.js'
import UndoIcon from '@mui/icons-material/Undo';
import PersonIcon from '@mui/icons-material/Person';
import { BlockPicker,CirclePicker,TwitterPicker } from "react-color";


export default function CardDialog(props){
    var arr=["pink","#efa497","#abe1e1","#f2f5ac"]
    const [x,sex]=useState(2)
    const [text,setText]=useState(`${props.Text}`)
    const [blockPickerColor, setBlockPickerColor] = useState(`${props.Color}`);
    const [Visiblity,setVisiblity]=useState(`${props.Format}`)
    const [VisiblityIcon,setVisiblityIcon]=useState()
    const [Refresh,setRefresh]=useState(0)
    const [OpenUpdate,setOpenUpdate]=useState(true)
    const [edited,setEdited]=useState('none')
    const [disable,setDisable]=useState(false)
    const [Picker,setPicker]=useState(false)
    const [Delete,setDelete]=useState("Delete")
    const [update,setupdate]=useState("Update")
    const [undo,setundo]=useState("Undo")
    function updation(e){
        setText(e)
        setEdited('flex')
    }
    async function FunUpdate(){
        setupdate("Updating..")
        setDisable(true)
        setPicker(false)
        let result = axios.put("http://localhost:3001/",{id:props.id,Color:blockPickerColor,Text:text,  Format:Visiblity,Phone:props.Phone})
        setEdited('none')
        props.socket.emit("Changed",{h:"huehue"})
        setDisable(false)
        setupdate("update")
    }
    async function FunDelete(key){
        const data={
            id:props.id,
            Phone:props.Phone
        }
        setDisable(true)
        setDelete("Deleting..")
        setPicker(false)
        axios.post("http://localhost:3001/del",data)
        props.socket.emit("Changed",{h:"huehue"})
    }
    function FunColor(){
        setPicker(!Picker)
    }
    function FunVisi(){
        console.log(Visiblity)
        if(Visiblity==="Public"){
            setVisiblity("Private")
            setVisiblityIcon(<PersonIcon/>)
        }
        else{
            setVisiblity("Public")
            setVisiblityIcon(<GroupsIcon/>)
        }
    }
    return <Dialog
        open={props.Open}
        onClose={props.CloseFun()}
        >
            <div className="Cards-Container" style={{backgroundColor:blockPickerColor}}>
        <div className="Cards-Heading">
        <p className="Cards-Phone" ><b>{props.Name}</b></p>
        <p className="Cards-Time" style={{color:"green"}}><b>{format(props.Time)}</b></p>
        </div>
        
        <textarea disabled={disable} spellCheck="false" className="Cards-Text" id='textArea' rows={4} onChange={e=>updation(e.target.value)} defaultValue={text}></textarea>
        <div style={{width:'25vw',display:'flex',flexWrap: 'wrap',justifyContent:'space-evenly'}}>
        <Tooltip title={Delete}><IconButton  className="Cards-Buttons" disabled={disable}   onClick={event=> FunDelete(props.id)}  color="error"><DeleteIcon /></IconButton></Tooltip>
        <Tooltip title={update}><IconButton   color="success" className="Cards-Button" disabled={disable} onClick={event=> FunUpdate()} ><BorderColorIcon/></IconButton></Tooltip>
        <Tooltip title={Visiblity}><IconButton onClick={FunVisi} color="primary"  className="Cards-Button"   disabled={disable} >{VisiblityIcon}</IconButton></Tooltip>
        <Tooltip title="Color"><IconButton color="primary"  className="Cards-Button" onClick={FunColor}   disabled={disable} ><FormatColorTextIcon/></IconButton></Tooltip>
        </div>
        {Picker && <TwitterPicker color={blockPickerColor} 
        onChange={(color) => {
            setBlockPickerColor(color.hex);
          }}
        />}
        
    </div>
        </Dialog>


    
}