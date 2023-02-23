
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './components/Home/home';
import Register from './components/registers/registers';
import Login from './components/login/login';
import Header from './components/Header/Header';
import NewNote from './components/NewCard/NewCard';
import NewButt from './components/NewButton/NewButton';
import Profile from './components/Profile/Profile';
import Handler from './components/Home/homehandler';
import io from 'socket.io-client';
import EditButton from './components/Profile/Profile2';
import { Typography } from '@mui/material';
const socket = io("http://localhost:3001", { transport: ['websocket' ] });
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<><Header/><Typography color='primary' style={{color:'white',backgroundColor:'#1976d2'}} mt={2} mb={0.5}>My Notes</Typography><div className='LowerHome'><NewButt socket={socket} />  <Home socket={socket} /></div></>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/new'  element={<><Header/><Home/><NewNote /></>} />
      <Route path='/profile'  element={<><Header/><Typography color='primary' style={{color:'white',backgroundColor:'#1976d2'}} mt={2} mb={0.5}>My Notes</Typography><EditButton/></>} />
      <Route path='/test'  element={<><Header/><Typography color='primary' style={{color:'white',backgroundColor:'#1976d2'}} mt={2} mb={0.5}>My Notes</Typography><Profile/></>} />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
