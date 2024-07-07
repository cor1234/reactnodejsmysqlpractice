const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const RouterPath= require('./router');
const app=express();

const port=7000;
app.use(bodyparser.json());
app.use(cors());
app.use("/",RouterPath);
app.use("/api/user",RouterPath);
app.use("/api/adduser",RouterPath);
app.use("/api/registeruserdata",RouterPath);
app.listen(port,()=>console.log("Server connected on port 7000"));