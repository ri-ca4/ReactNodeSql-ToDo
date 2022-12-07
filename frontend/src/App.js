import React from "react";
import { useState , useEffect } from "react";
import Axios from "axios";
import './App.css';


function App() {
  const [task, setTask] = useState('')
  const [toDoList, setToDoList] = useState ([])
  const [updatedTask, setUpdatedTask] = useState('')

  useEffect(()=>{
    Axios.get('http://localhost:3001/load').then((response)=>{
      setToDoList(response.data)
    })
  })
  
  const submitTask = ()=>{
    Axios.post('http://localhost:3001/insert', {
      task: task
    })
  }

  const deleteTask = (id)=>{
    Axios.delete(`http://localhost:3001/del/${id}`)
  }

  const updateTask = (id)=>{
    Axios.put('http://localhost:3001/update', {
      id: id,
      title: updatedTask
    })
    setUpdatedTask('')
  }
  
  const [isHidden, setHidden] = useState("false");

  const handleToggle = () => {
    setHidden(!isHidden);
  };

  return (
    <div className="App">

      <h1>TO DO LIST</h1>
      <label name="task">Enter Task</label><br/>
      <input type="text" name="task" onChange={(e)=>{
          setTask(e.target.value)
        }}/><br/>
      <div className="buttons">
        <button className="submit" onClick={submitTask}>Submit</button>
        <button className="edit" onClick={handleToggle}>Edit</button><br/>
      </div>
      <button onClick={handleToggle}
        className={isHidden ? 'hidden' : 'exitEdit'}>Exit Edit</button>


      {toDoList.map((val)=>{
        return (
        <div className="toDoItem">
          <h1>{val.Title}</h1>
          <button className="del" onClick={()=>{deleteTask(val.id)}}>Delete</button>
          <div className={isHidden ? 'hidden' : "editArea"}>
            <input type="text" placeholder={val.Title} onChange={(e)=>{
                setUpdatedTask(e.target.value)
              }}/>
            <button className="submit" onClick={()=>{updateTask(val.id)}}>Submit</button>
          </div>
        </div>
        )
      })}
    </div>
  );
}

export default App;
