const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();


const connection = require("./mysqlConnection");

connection.connect();

app.use(bodyParser.json())

app.get("/",(req,res)=>{
  connection.query('select * from scheduler',(error, results, fields)=>{
    if(!error){
      console.log(results);
    }else{
      console.log(error);
      
    }
  })
});

app.post("/create-event",(req,res)=>{
  const {id,EventName,Stime,Etime,Name,Date,Week} = req.body;
  console.log(req.body)
  connection.query(`
  insert into scheduler (id,Name,EventName,Stime,Etime,Date,Week,Month) 
  values('${id}','${Name}','${EventName}','${Stime}','${Etime}','${Date}','${Week}','${5}');`,
  (err,result,fields)=>{
    if(err){
      console.log("error",err);
      res.send(err.code)

    }else{
      console.log("result",result);
      res.send(true);

    }
  })
});

app.get("/event",(req,res)=>{
  const {user} = req.headers;
  connection.query(`select * from scheduler where Name = '${user}' order by Date asc`,(err,result,fields)=>{
    if(!err && result.length >0){
      res.send(result);
    }else{
      res.send(false)
    }
  })
});

app.listen(process.env.PORT || 8080,()=>{
  console.log("server started on port 8080");
})