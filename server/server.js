const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./pool.js');

const app = express();


app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

app.use( express.static('server/public') );


//get tasks from database
app.get('/tasks', (req, res)=>{
    const sqlText= `SELECT * FROM tasks ORDER BY completed, id;`;
    pool.query(sqlText)
    .then( (result) => {
      console.log(`Got stuff back from the database`, result);
      res.send(result.rows);
    })
    .catch( (error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    })
})//end app.get

//add a task
app.post('/tasks', (req, res)=>{
    let newTask = req.body;
    const sqlText = `INSERT INTO tasks (name) VALUES 
  ($1);`;
  pool.query(sqlText, [newTask.name])
        .then((result) => {
            console.log(`Added task to database`, newTask);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); //
})
})//end app.post

//delete tasks from database
app.delete('/tasks/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    let sqlText = 'DELETE FROM tasks WHERE id=$1;';
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('Task deleted');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})//end app.delete

const port = process.env.PORT || 5000;
app.listen( port, () => {
  console.log('up and running on port ', port);
});