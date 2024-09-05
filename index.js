var express = require('express');
var pg = require('pg');
var path = require('path');

const app = express();
const port = 4000;

app.use(express.static("example"));

const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"LiveHome3D",
  password:"root",
  port:5432,
});

db.connect();

let items=null;

db.query("SELECT * FROM items",(err,res)=>{
    if(err){
        console.error("Error executing query",err.stack);
      }else {
        console.log("successfully loaded the data from server");
        items=res.rows;
      }
});

app.get('/', (req, res) => {
  res.render("index.ejs",{items : items});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });