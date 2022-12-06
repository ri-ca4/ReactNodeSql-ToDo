const mysql = require('mysql2');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'todolist',
    password: '',
});

connection.connect((err) =>{  
    if (err){
    console.log(err)
    }else{
    console.log('connected');
}})

app.listen(5000);