const mysql = require('mysql2');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'todolist',
    password: '',
});

app.use(bodyParser.json())
app.use(cors())

db.connect((err) =>{  
    if (err){
    console.log(err)
    }else{
    console.log('connected');
}})

app.post('/insert', cors(), (req, res)=>{
    const newTask = req.body.task;
    console.log(newTask)
    const sqlInsert = "INSERT INTO todos (Title) VALUES (?)"
    db.query(sqlInsert, [newTask], (err, result)=>{
        if (err){
            console.log(err)
            }else{
            console.log(result);
            }
    })
})

app.listen(3001);