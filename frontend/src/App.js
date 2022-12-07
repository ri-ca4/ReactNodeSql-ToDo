import React from "react";
import { useState , useEffect } from "react";
import Axios from "axios";



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
    console.log(updatedTask)
    Axios.put('http://localhost:3001/update', {
      id: id,
      title: updatedTask
    })
    setUpdatedTask('')
  }

  return (
    <div className="App">
      <h1>TO DO LIST</h1>
      <label name="task">Enter Task</label>
      <input type="text" name="task" onChange={(e)=>{
        setTask(e.target.value)
      }}/>
      <button onClick={submitTask}>Submit</button>
      {toDoList.map((val)=>{
        return (
        <div className="toDoItem">
          <h1>{val.Title}</h1>
          <button>Edit</button>
          <button onClick={()=>{deleteTask(val.id)}}>Delete</button>
          <div className="hidden">
            <input type="text" onChange={(e)=>{
                setUpdatedTask(e.target.value)
              }}/>
            <button onClick={()=>{updateTask(val.id)}}>Submit</button>
          </div>
        </div>
        )
      })}
    </div>
  );
}

export default App;
