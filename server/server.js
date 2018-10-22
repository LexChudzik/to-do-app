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
});

const port = process.env.PORT || 5000;
app.listen( port, () => {
  console.log('up and running on port ', port);
});