import React,{useEffect, useState} from "react";
import './Cards.css'
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { format, render, cancel, register } from 'timeago.js'
import UndoIcon from '@mui/icons-material/Undo';
import PersonIcon from '@mui/icons-material/Person';
import { BlockPicker,CirclePicker,TwitterPicker } from "react-color";
function ProCards(props){
    var arr=["pink","#efa497","#abe1e1","#f2f5ac"]
    const [x,sex]=useState(2)
    const [text,setText]=useState(`${props.Text}`)
    const [blockPickerColor, setBlockPickerColor] = useState(`${props.Color}`);
    
    return <div className="Cards-Container" style={{backgroundColor:blockPickerColor}}>
        <div className="Cards-Heading">
        <p className="Cards-Phone" ><b>{props.Name}</b></p>
        <p className="Cards-Time" style={{color:"green"}}><b>{format(props.Time)}</b></p>
        </div>
        
        <p  className="Cards-Text" id='textArea' >{text}</p>
        
    </div>
    
}

export default ProCards;