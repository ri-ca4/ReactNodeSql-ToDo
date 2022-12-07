import React from "react";
import { useState , useEffect } from "react";
import Axios from "axios";

function App() {
  const [task, setTask] = useState('')

  const submitTask = ()=>{
    Axios.post('http://localhost:3001/insert', {
      task: task
    }).then(()=>{
      alert('Task Saved')
    })
  }

  return (
    <div className="App">
      <h1>TO DO LIST</h1>
      <label name="task">Enter Task</label>
      <input type="text" name="task" onChange={(e)=>{
        setTask(e.target.value)
      }}/>
      <button onClick={submitTask}>Submit</button>
    </div>
  );
}

export default App;
