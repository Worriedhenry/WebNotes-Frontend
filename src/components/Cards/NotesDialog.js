import { Dialog, Grid, TextField, Typography, IconButton,Tooltip,styled } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { format} from 'timeago.js';
import GroupsIcon from '@mui/icons-material/Groups';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import {TwitterPicker } from "react-color";
import { useState,useContext } from "react";
import axios from "axios"
import { NotesContext } from "../../Context/NotesContext";


const StyledButton=styled(IconButton)(({theme})=>({
    width:"3vw",
    [theme.breakpoints.down('sm')]: {
        width:"7vw"
      },
     }));
export default function NotesDialog({ props, 
DialogController, setDialogController }) {

    const [NotesFormat, setNotesFormat] = useState(props.Format)
    const [NotesText, setNotesText] = useState(props.Text)
    const [Picker, setPicker] = useState(false)
    const [VisiblityIcon, setVisiblityIcon] = useState(NotesFormat == "Public" ? <GroupsIcon sx={{height:"100%",width:"100%"}} /> : <PersonIcon sx={{height:"100%",width:"100%"}} />)
    const [blockPickerColor, setBlockPickerColor] = useState("#FFFFFF")
    const {Notes,setNotes}=useContext(NotesContext)
    async function UpdateNote(){
        setPicker(false)
        let result = await axios.put("http://localhost:3001/note/update",{id:props.id,Color:blockPickerColor,Text:NotesText,  Format:NotesFormat,Phone:props.Phone})
        if (result.status===200){
            setNotes(result.data.reverse())
        }
    }
    async function DeleteNote(key){
        try{
        const data={
            id:props.id,
            Phone:props.Phone
        }
        setPicker(false)
        let result=await axios.post("http://localhost:3001/notes/delete",data)
        const UpdatedNotes=result.data
        console.log(result.data)
        setNotes(UpdatedNotes.reverse())
        }catch(err){
            console.log(err)
        }
    }
    function ChangeVisiblity(){
        if(NotesFormat==="Work"){
            setNotesFormat("Pesonal")
            setVisiblityIcon(<PersonIcon sx={{height:"100%",width:"100%"}}/>)
        }
        else{
            setNotesFormat("Work")
            setVisiblityIcon(<GroupsIcon sx={{height:"100%",width:"100%"}}/>)
        }
    }
    return (
        <Dialog
            open={DialogController}
            onClose={() =>setDialogController(false)}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "fit-content",
                        height: "fit-content",
                        maxHeight: "70vh",
                        minHeight:"40vh"
                    },
                },
            }}
        >
            <Grid className="Cards-Container" justifyContent="space-between" alignItems="space-between" container rowSpacing={1} md={12} sx={{ background: {blockPickerColor} }}>
                <Grid item md={12} container >
                    <Grid item md={6} xs={6}>
                        <Typography sx={{ color: "red" }}>{NotesFormat}
                        </Typography>
                    </Grid>
                    <Grid textAlign="center" item xs={6} md={6}>
                        <Typography value={NotesText} sx={{ color: "green" }}>{format(props.Time)}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField sx={{ maxHeight: "15vw",minHeight:"10vw",width:
                    "100%" ,fontSize:"small"}} variant="standard" 
                    fullWidth 
                    multiline
                    InputProps={{ disableUnderline: true }}
                    spellCheck={false}
                    value={NotesText}
                    onChange={(e)=>setNotesText(e.target.value)}
                    className="DialogTruncate" />
                </Grid>
                <Grid item container justifyContent="space-around" md={12}>
                    <Tooltip title="Update">
                        <StyledButton onClick={UpdateNote} color="primary">
                            <BorderColorIcon sx={{height:"100%",width:"100%"}} />
                        </StyledButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <StyledButton onClick={DeleteNote} color="primary">
                            <DeleteIcon sx={{height:"100%",width:"100%"}} />
                        </StyledButton>
                    </Tooltip>
                    <Tooltip title={NotesFormat}>
                        <StyledButton onClick={ChangeVisiblity} color="primary">
                            {VisiblityIcon}
                        </StyledButton>
                    </Tooltip>
                    <Tooltip title="Color">
                        <StyledButton onClick={()=>setPicker(!Picker)} color="primary">
                            <FormatColorTextIcon sx={{height:"100%",width:"100%"}}/>
                        </StyledButton>
                    </Tooltip>
                    <Tooltip title="Cancle">
                        <StyledButton onClick={()=>setDialogController(false)} color="primary">
                            <CancelIcon sx={{height:"100%",width:"100%"}}/>
                        </StyledButton>
                    </Tooltip>

                </Grid>
                <Grid item md={12} textAlign="center">
                    {Picker && <TwitterPicker color={blockPickerColor}
                        onChange={(color) => {
                            setBlockPickerColor(color.hex);
                        }}
                    />}
                </Grid>
            </Grid>
        </Dialog>
    )
}