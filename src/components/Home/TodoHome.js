import React, { useEffect, useState } from 'react';
import { useNavigate,useSearchParams} from 'react-router-dom'
import './Home.css'
import GridTodoCards from '../Cards/GridTodoCards';
import { TaskContext } from '../../Context/TaskContext';
function TodoHome() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const {Task}=React.useContext(TaskContext)
  return <>
        {!Task&& <h3 style={{width:"100%",height:'100%',margin:'auto',textAlign:'center',color:"#1976d2"}}>Click on Add task to schedule a task</h3>}
    <div className="Home-Grid">
        {Task.map((e)=> <GridTodoCards key={e._id} id={e._id} Format={e.Format} Phone={searchParams.get("Phone")} Name={searchParams.get("Name")} Text={e.TodoText}  status={e.Status} Time={e.Time} Color={e.Color} Head={e.TodoHeading} />)}
    </div>
    </>
}

export default TodoHome;
