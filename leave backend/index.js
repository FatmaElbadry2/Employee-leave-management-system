const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const DB = require("./config/database")
const passport = require('passport');
const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport').Auth(passport);


const Users = require("./models/user")
const Relationships=require("./models/relationships")
const Requests =require("./models/requests")

const server = app.listen(5000,()=> 
console.log(`listening to port 5000`)
);

const { Sequelize, Model, DataTypes } = require('sequelize');
DB.authenticate().then(()=>{
    console.log("postgres connected")
   
}).catch((err)=>console.log(err));



const user_routes=require('./controllers/user');
app.use("/api/users",user_routes);

const rec_routes=require('./controllers/requests');
app.use("/api/requests",rec_routes);



DB.sync({force: false});
module.exports=server;