import React,{useState,useEffect} from 'react';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid} from '@mui/material/';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom'
import Error from '../errors';

export default function Login() {
    const navigate=useNavigate()
   
    const [phone,setPhone]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState(100)

    useEffect(()=>(
        sessionStorage.clear()
    ))


    const userData={
        Phone:phone,
        Password:password,
    }
    const HandleChange=async ()=>{
      setError(111)
        let result= await axios.post('http://localhost:3001/login',userData)
        setError(result.data.err)

        if(result.data.err!==200){
            setTimeout(() => setError(100), 3000);
            
        }
        else{
            sessionStorage.setItem("CurrentUser",phone)
            navigate(`/?Phone=${phone}&&Name=${result.data.Name}`)
        }
        setPhone("")
        setPassword("")
    }
   
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data ={
        phone:phone,
    }
    setError(111)
    var result = axios.post("http://localhost:3001/login",data)
    setError(100)
    console.log(result);
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              label="Phone Number"
              name=""
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Pass"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={HandleChange}
            >
              Sign In
            </Button>
            <Typography component="h1" variant="text">
            {Error[error]}
          </Typography>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}