import { Grid, IconButton, Tooltip, Typography,styled } from "@mui/material"
import { format} from 'timeago.js'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState } from "react";
import NotesDialog from "./NotesDialog";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const TitleTypography = styled(Typography)(({ theme }) => ({
  
    fontSize:"small",
    textOverflow:"ellipsis",
    wordWrap:"nowrap",
    [theme.breakpoints.down('sm')]: {
      fontSize:"0.75em", 
      textOverflow:"ellipsis",
    wordWrap:"normal",
    overflow:"hidden",
    whiteSpace:"nowrap"
    },
  }));
const TextTypography=styled(Typography)(({ theme }) => ({
  
    fontSize:"small",
    [theme.breakpoints.down('sm')]: {
      fontSize:"0.5em", 
      MaxWidth:"100%"
    },
  }));
const StyledButton=styled(IconButton)(({theme})=>({
    width:"3vw",
    [theme.breakpoints.down('sm')]: {
        width:"7vw"
      },
     }));
export default function GridCard(props) {

    const [ViewNote,setViewNote]=useState(false)
    const [DialogController,setDialogController]
    =useState(false)
    const [searchParams,setSearchParams]=useSearchParams()

   


    return (
        <Grid className="Cards-Container" container rowSpacing={0.5} md={12} sx={{ background: "white" }}>
            <Grid item md={12} container >
                <Grid item md={6} xs={6}>
                    <TitleTypography sx={{ color: "red" }}>{props.Format}
                    </TitleTypography>
                </Grid>
                <Grid item md={6} xs={6}>
                    <TitleTypography  sx={{ color: "green" }}>{format(props.Time)}
                    </TitleTypography>
                </Grid>
            </Grid>
            <Grid item md={12} xs={12}>
                <TextTypography sx={{fontSize:"small",height:"10vh"}} className="truncate">
                    {props.Text}
                </TextTypography>
            </Grid>
            <Grid md={12}>
                <Tooltip title="update">
                    <StyledButton onClick={()=>setDialogController(true)} color="primary">
                        <BorderColorIcon sx={{width:"100%",height:"100%"}} />
                    </StyledButton>
                </Tooltip>
            </Grid>
        <NotesDialog props={props} DialogController={DialogController} setDialogController={setDialogController}/>
        </Grid>
    )
}