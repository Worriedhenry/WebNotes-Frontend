import React, { useState, useEffect } from "react";
import { Button, styled, Grid,Typography } from '@mui/material'
import { useNavigate, useSearchParams } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GridCard from "../Cards/GridNoteCard";
import SortIcon from '@mui/icons-material/Sort';
import axios from 'axios'
import { NotesContext } from "../../Context/NotesContext";

const StyledButton = styled(Button)(({ theme }) => ({
  
    minWidth:"0px",
    [theme.breakpoints.down('sm')]: {
      width:"8vw",
      MaxWidth:"100%"
    },
  }));
  const StyledTypography=styled(Typography)(({theme})=>({
    fontSize:"small",
    [theme.breakpoints.down('sm')]: {
    fontSize:"1.4vw"
  },
}))
export default function RightHome() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()
  const [Query, setQuery] = useState( searchParams.get("query") ? searchParams.get("query") : "")
  const [CurrentNote, setCurrentNote] = useState(1)
  const { Notes, setNotes, AllNotes, setAllNotes } = React.useContext(NotesContext)
  const [Loader, setLoader] = useState(true)
  const [New, setNew] = useState("New Note")
  const current = new Date()
  const AddNote = async () => {
    const NoteData = {
      Phone: searchParams.get("Phone"),
      Visibilty: "Personal",
      Text: "Add your Text Here"
    }
    var array_Reversed = []
    let result = await axios.post('http://localhost:3001/new', NoteData)
    array_Reversed = result.data.Notes
    array_Reversed.reverse()
    setNotes(array_Reversed)
    setAllNotes(array_Reversed)
  }


  const ClearSearch = () => {
    setQuery("")
    const currentQuery = new URLSearchParams(searchParams);
  currentQuery.set('query', "");
  setSearchParams(currentQuery.toString());
  const Format=searchParams.get("format")
  let filteredNotes = AllNotes;
  if(Format=="personal"){
    filteredNotes=AllNotes.filter(note=>note.Format=="Personal")
  }
  if(Format=="work"){
    filteredNotes=AllNotes.filter(note=>note.Format=="Work")
  }
  setNotes(filteredNotes)
  }
  useEffect(() => {
    async function getData() {
      if (!sessionStorage.getItem("CurrentUser")) {
        navigate('/login')
      }
      const query = searchParams.get("query");
      const lowercaseQuery = query ? query.toLowerCase() : null;
      const result = await axios.post("http://localhost:3001/", { Phone: searchParams.get("Phone") })
      var array_Reversed = result.data.err
      array_Reversed.reverse()
      setAllNotes(array_Reversed)
      if (searchParams.get("format")) {
        if (searchParams.get("format") === "personal") {
          array_Reversed= array_Reversed.filter(note => note.Format == "Personal")
          console.log("hi", array_Reversed.filter(note => note.Format == "Personal"))
        }
        else if (searchParams.get("format") === "work") {
          array_Reversed=array_Reversed.filter(note => note.Format === "Work")
        }
        if(lowercaseQuery){
          array_Reversed=array_Reversed.filter(note=>note.NoteText.toLowerCase().includes(lowercaseQuery))
        }
        setNotes(array_Reversed)
      }
      else {
        setNotes(array_Reversed)
      }
      

    }
    getData();
    setLoader(false)
  }, [])

  const filterNotes=()=>{
    const currentQuery = new URLSearchParams(searchParams);
  currentQuery.set('query', Query);
  setSearchParams(currentQuery.toString());
  
  setNotes(Notes.filter(note=>note.NoteText.toLowerCase().includes(Query.toLowerCase())))

  }

  function ChangeQuery(Format) {
  const query = searchParams.get("query");
  const lowercaseQuery = query ? query.toLowerCase() : null;

  let filteredNotes = AllNotes;
  console.log(AllNotes)
  if(Format=="personal"){
    filteredNotes=AllNotes.filter(note=>note.Format=="Personal")
  }
  if(Format=="work"){
    filteredNotes=AllNotes.filter(note=>note.Format=="Work")
  }
  const currentQuery = new URLSearchParams(searchParams);
  currentQuery.set('format', Format);
  setSearchParams(currentQuery.toString());
  console.log(filteredNotes)
  if(lowercaseQuery){
    filteredNotes=filteredNotes.filter(note=>note.NoteText.toLowerCase().includes(lowercaseQuery))
    console.log(filteredNotes)
  }
  setNotes(filteredNotes);
}

  return <div md={10}
    className="RightHome"
  >
    <input
      placeholder="Search Notes"
      className="NoteSearchQueryBox"
      onChange={(e) => setQuery(e.target.value)}
      value={Query}
    >

    </input>
    {Query.length != 0 && <StyledButton variant="contained" onClick={filterNotes} ><StyledTypography>Search</StyledTypography></StyledButton>}
    {Query.length != 0 && <StyledButton variant="contained" color="error" onClick={ClearSearch}><StyledTypography>Clear</StyledTypography></StyledButton>}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      marginBottom:"10px"
    }}>
      <div>
        <StyledButton sx={{minWidth:"0px"}} size="small" onClick={() => ChangeQuery("all")} variant={!(searchParams.get("format") == "work" || searchParams.get("format") == "personal") ? "contained" : "text"}  ><StyledTypography>All</StyledTypography></StyledButton>
        <StyledButton size="small" onClick={() => ChangeQuery("personal")} variant={searchParams.get("format") == "personal" ? "contained" : "text"} ><StyledTypography>Personal</StyledTypography></StyledButton>
        <StyledButton size="small" onClick={() => ChangeQuery("work")} variant={searchParams.get("format") == "work" ? "contained" : "text"}><StyledTypography>Work</StyledTypography></StyledButton>
      </div>
      <StyledButton size="small" style={{ justifyContent: "flex-start" }} onClick={AddNote} startIcon={<AddCircleIcon  />} >
        <StyledTypography>Add Notes</StyledTypography></StyledButton>

    </div>
    {!Notes && <h3 style={{ width: "100%", height: '100%', margin: 'auto', textAlign: 'center', color: "#1976d2" }}>Click on New Note to add Notes</h3>}
    <Grid container spacing={2} className="Home-Grid">
      {Notes && Notes.map((e) => <Grid md={3} xs={6} item><GridCard key={e._id} id={e._id} Format={e.Format} Phone={searchParams.get("Phone")} Name={searchParams.get("Name")} Text={e.NoteText} Time={e.Time} Color={e.Color} /></Grid>)}
    </Grid>
  </div>
}