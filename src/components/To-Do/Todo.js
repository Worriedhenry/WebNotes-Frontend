import React,{useState,useEffect} from "react";
import Home from "../Home/home";
import {Button, Tooltip,TextField,styled,Dialog,Typography,Grid} from '@mui/material'
import { useNavigate ,useSearchParams} from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import LeftHome from "../LeftHome.js/LeftHome";
import axios from 'axios'
import TodoHome from "../Home/TodoHome";
import { TaskContext } from "../../Context/TaskContext";

const TextTypography=styled(Typography)(({ theme }) => ({
  
  fontSize:"small",
  [theme.breakpoints.down('sm')]: {
    fontSize:"0.5em", 
    MaxWidth:"100%"
  },
}));
const StyledButton=styled(Button)(({theme})=>({
  width:"3vw",
  [theme.breakpoints.down('sm')]: {
      width:"7vw"
    },
   }));


export default function Todo({socket}){
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate=useNavigate()
    const [CurrentNote,setCurrentNote]=useState(1)
    const [DateTime,setDateTime]=useState(null)
    const [Heading,setHeading]=useState("")
    const [Query,setQuery]=useState("")
    const [text,setText]=useState('')
    const [AllArray,setAllArray]=useState([])
    const [arr,setArray]=useState([])
    const [Prevarr,setPrevArray]=useState(arr)
    const [New,setNew]=useState("New Note")
    const [Open,setOpen]=useState(false)
    const {Task,setTask,setAllTask,AllTask}=React.useContext(TaskContext)
    const current=new Date()
    const AddNote=async ()=>{
      const data={
        Phone:searchParams.get("Phone"),
        Head:Heading,
        Text:text,
        Format:"Personal",
        DateTime:DateTime,

    }
        let result=await axios.post('http://localhost:3001/NewTask',data)
        var array_Reversed=result.data.Todo
        array_Reversed.reverse()
        setOpen(false)
        setArray(array_Reversed)
    }
    useEffect(() => {
      async function getData(){   
        const result=await axios.post("http://localhost:3001/Task", { Phone: searchParams.get("Phone")})
        var array_Reversed=result.data.err.reverse()
        setAllTask(array_Reversed)
        setTask(array_Reversed)
      }
        getData();
    },[])

    const FilterTask=()=>{
      if(Query.length===0){
        return
      }
      var LowerQuery=Query.toLowerCase()
      setTask(AllTask.filter(task=> task.TodoHeading.toLowerCase().includes(LowerQuery)||task.TodoText.toLowerCase().includes(LowerQuery)
      ))
    }
    const ClearSearch=()=>{
      setQuery("")
      setArray(AllArray)
    }


    return <Grid container alignItems="flex-start" height="100vh">
      <Grid item md={2} xs={2} height="100%" >
        <LeftHome />
      </Grid>
    <Grid container item mt={1} xs={10}  p={2} md={10} >
    <input
      placeholder="Search Notes"
      className="NoteSearchQueryBox"
      onChange={(e) => setQuery(e.target.value)}
      value={Query}
    >
    </input>
    {Query.length!=0 && <StyledButton variant="contained" onClick={FilterTask}><TextTypography>Search</TextTypography></StyledButton>}
    {Query.length!=0 && <StyledButton variant="contained" color="error" onClick={ClearSearch}><TextTypography>Cancel</TextTypography></StyledButton>}
  <div style={{
    display:"flex",
    justifyContent:"space-between",
    padding:"10px",
    width:"100%"
  }}>
    <div>
        <StyledButton variant="contained"  onClick={()=> {
          }}><TextTypography>All</TextTypography></StyledButton>
        
    </div>
    <StyledButton  style={{justifyContent: "flex-start"}} onClick={()=>setOpen(true)} startIcon={<AddCircleIcon />} >
    <TextTypography>Add Task</TextTypography></StyledButton>
      </div>
  {Task && <TodoHome />}


  <Dialog
        open={Open}
        onClose={()=>setOpen(false)}
        sx={{
            "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                    width: "fit-content",
                    maxWidth: "40vw",  // Set your width here
                    height: "fit-content",
                    maxHeight: "60h"
                },
            },
        }}
        >
            <div className="Cards-Container2" style={{margin:"0px"}}>
        <div className="Cards-Heading">
        <h2 style={{width:"100%",textAlign:"center"}} ><b>Create New Task</b></h2>

        </div>
        <p>
        <TextField
        fullWidth
        label="Enter Heading"
        onChange={(e)=> setHeading(e.target.value)}
        />
        </p>
        <TextField
          id="filled-multiline-static"
          label="Enter description"
          fullWidth
          multiline
          rows={4}
          onChange={(e)=> setText(e.target.value)}
          variant="filled"
        />
        <div style={{width:'100%',display:'flex',flexWrap: 'wrap',justifyContent:'space-evenly'}}>
        <TextField placeholder="Enter Heading" type="datetime-local" onChange={(e)=> setDateTime(e.target.value)}
         />
        <Tooltip title="Create"><Button  className="Cards-Buttons" onClick={AddNote}    color="success" startIcon={<DeleteIcon />} > Create</Button></Tooltip>
        
        <Button startIcon={<CancelIcon/>} className="Cards-Button" onClick={()=>
        setOpen(false)}  >Cancel</Button>
        </div>
        
        
    </div>
        </Dialog>
    </Grid>
  </Grid>
}