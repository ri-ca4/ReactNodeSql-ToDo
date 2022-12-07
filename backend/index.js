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

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

db.connect((err) =>{  
    if (err){
    console.log(err)
    }else{
    console.log('connected');
}})

app.post('/insert', (req, res)=>{
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

app.get('/load', (req, res)=>{
    const sqlSelect = "SELECT * FROM todos";
    db.query(sqlSelect, (err, result)=>{
        if (err){
            console.log(err)
            }else{
            res.send(result)
            }
    })
})

app.delete('/del/:id', (req, res)=>{
    const id = req.params.id;
    const sqlDel = "DELETE FROM todos WHERE id = ?"
    db.query(sqlDel, id, (err, result)=>{
        if (err){
            console.log(err)
            }else{
            res.send(result)
            }
    })
})

app.put('/update', (req, res)=>{
    const id = req.body.id;
    const title = req.body.title;
    const sqlUpdate = "UPDATE todos SET Title = ? WHERE id = ?"
    db.query(sqlUpdate, [title, id], (err, result)=>{
        if (err){
            console.log(err)
            }else{
            res.send(result)
            }
    })
})

app.listen(3001);