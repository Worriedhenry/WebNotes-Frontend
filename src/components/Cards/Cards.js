import React,{useEffect, useState} from "react";
import './Cards.css'
import axios from "axios";
import { Grid, TailSpin } from 'react-loader-spinner'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import GroupsIcon from '@mui/icons-material/Groups';
import CancelIcon from '@mui/icons-material/Cancel';
import {Button, ButtonGroup, IconButton, Tooltip,Dialog, Paper} from '@mui/material'
// import { useNavigate } from "react-router-dom";
import { format, render, cancel, register } from 'timeago.js'
import UndoIcon from '@mui/icons-material/Undo';
import PersonIcon from '@mui/icons-material/Person';
import { BlockPicker,CirclePicker,TwitterPicker } from "react-color";
function Cards(props){
    var arr=["pink","#efa497","#abe1e1","#f2f5ac"]
    const [x,sex]=useState(2)
    const [text,setText]=useState(`${props.Text}`)
    const [PreText,setPreText]=useState(`${props.Text}`)
    const [blockPickerColor, setBlockPickerColor] = useState(`${props.Color}`);
    const [PaperColor, setPaperColor] = useState(`${props.Color}`);
    const [Visiblity,setVisiblity]=useState(`${props.Format}`)
    const [VisiblityIcon,setVisiblityIcon]=useState()
    const [Refresh,setRefresh]=useState(0)
    const [edited,setEdited]=useState('none')
    const [Open,setOpen]=useState(false)
    const [disable,setDisable]=useState(false)
    const [Picker,setPicker]=useState(false)
    const [DeleteBoolean,setDeleteBoolean]=useState(false)
    const [UpdateBoolean,setUpdateBoolean]=useState(false)
    const [Delete,setDelete]=useState("Delete")
    const [update,setupdate]=useState("Update")
    const [undo,setundo]=useState("Undo")
    function updation(e){
        setText(e)
        setEdited('flex')
        // console.log(text)
    }
    useEffect(()=>{
        // console.log(props)
        sex(Math.floor(Math.random()*10)%4)
        if(props.Format==="Public"){
            setVisiblityIcon(<GroupsIcon/>)
        }
        else{
            setVisiblityIcon(<PersonIcon />)
        }
    },[])
    async function FunUpdate(){
        setupdate("Updating..")
        setText(PreText)
        setEdited('flex') 
        setPaperColor(blockPickerColor)
        setDisable(true)
        setPicker(false)
        let result = await axios.put("http://localhost:3001/",{id:props.id,Color:blockPickerColor,Text:PreText,  Format:Visiblity,Phone:props.Phone})
        console.log(result,text,PreText)
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
        setDeleteBoolean(true)
        setDelete("Deleting..")
        setPicker(false)
        await axios.post("http://localhost:3001/del",data)
        props.socket.emit("Changed",{h:"huehue"})
        
    }
    function FunColor(){
        setPicker(!Picker)
    }
    function FunVisi(){
        console.log(Visiblity)
        if(Visiblity==="Work"){
            setVisiblity("Pesonal")
            setVisiblityIcon(<PersonIcon/>)
        }
        else{
            setVisiblity("Work")
            setVisiblityIcon(<GroupsIcon/>)
        }
    }
    return <Paper elevation={2} style={{"margin":"10px"}}>
    <div className="Cards-Container" style={{backgroundColor:PaperColor}}>
        <div className="Cards-Heading">
        <p className="Cards-Phone" ><b>{props.Format}</b></p>
        <p className="Cards-Time" style={{color:"green"}}><b>{format(props.Time)}</b></p>
        </div>
        
        <textarea disabled spellCheck="false" className="Cards-Text" id='textArea' rows={4}  value={text}></textarea>
        <div style={{width:'100%',display:'flex',flexWrap: 'wrap',justifyContent:'space-evenly'}}>
        <Tooltip title={update}><IconButton   color="primary" className="Cards-Update" disabled={disable} onClick={()=>setOpen(true)} ><BorderColorIcon/></IconButton></Tooltip>
        
        </div>
<Dialog
        open={Open}
        onClose={()=>setOpen(false)}
        sx={{
            "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                    width: "fit-content",
                    maxWidth: "50vw",  // Set your width here
                    height: "fit-content",
                    maxHeight: "50vh"
                },
            },
        }}
        >
            <div className="Cards-Container2" style={{backgroundColor:blockPickerColor,margin:"0px"}}>
        <div className="Cards-Heading">
        <p className="Cards-Phone" ><b>{props.Name}</b></p>
        <p className="Cards-Time" style={{color:"green"}}><b>{format(props.Time)}</b></p>
        </div>
        
        <textarea disabled={disable} spellCheck="false" className="Cards-Text" id='textArea' rows={4} onChange={e=>setPreText(e.target.value)} value={PreText}></textarea>
        <div style={{width:'100%',display:'flex',flexWrap: 'wrap',justifyContent:'space-evenly'}}>
        <TailSpin
            height="30"
            width="30"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="0.2"
            wrapperStyle={{}}
            wrapperClass=""
            visible={DeleteBoolean}
        />
         <Tooltip title={Delete}><IconButton  className="Cards-Buttons" disabled={disable}   onClick={event=> FunDelete(props.id)}  color="error"><DeleteIcon /></IconButton></Tooltip>
        <Tooltip title={update}><IconButton   color="success" className="Cards-Button" disabled={disable} onClick={event=> FunUpdate()} ><BorderColorIcon/></IconButton></Tooltip>
        <Tooltip title={Visiblity}><IconButton onClick={FunVisi} color="primary"  className="Cards-Button"   disabled={disable} >{VisiblityIcon}</IconButton></Tooltip>
        <Tooltip title="Color"><IconButton color="primary"  className="Cards-Button" onClick={FunColor}   disabled={disable} ><FormatColorTextIcon color="secondary"/></IconButton></Tooltip>
        <Tooltip title="Cancle Changes"><IconButton color="primary"  className="Cards-Button" onClick={()=>
        setOpen(false)}   disabled={disable} ><CancelIcon/></IconButton></Tooltip>
        </div>
        {Picker && <TwitterPicker color={blockPickerColor} 
        onChange={(color) => {
            setBlockPickerColor(color.hex);
          }}
        />}
        
    </div>
        </Dialog>
    </div>
    </Paper>
    
}

export default Cards;