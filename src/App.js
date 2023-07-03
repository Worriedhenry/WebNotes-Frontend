
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/home';
import Register from './components/registers/registers';
import Login from './components/login/login';
import Header from './components/Header/Header';
import NewNote from './components/NewCard/NewCard';
import NewButt from './components/NewButton/NewButton';
import Profile from './components/Profile/Profile';
import Handler from './components/Home/homehandler';
import LeftHome from './components/LeftHome.js/LeftHome';
import RightHome from './components/RightHome/RightHome';
import Todo from './components/To-Do/Todo';
import EditButton from './components/Profile/Profile2';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { NotesState } from './Context/NotesContext';
import { AuthState } from './Context/AuthContext';
import { TaskState } from './Context/TaskContext';
function App() {
  return (
    <BrowserRouter>
      <NotesState>
        <TaskState>
        <Routes>
          <Route path='/notes' element={<><div className='LowerHome'><LeftHome  /><RightHome  /></div></>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        </TaskState>
      </NotesState>
    </BrowserRouter>
  );
}

export default App;
