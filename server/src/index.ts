//create an express app

import express from "express";
import cors from "cors";
//import middleware from "./middleware/index";
import admin from "firebase-admin";
import { readdirSync, rmSync, writeFileSync, mkdirSync } from "fs";
//import the realtime database
import createuser from './routes/createuser/createuser';



console.log("Hello world !")



const app = express();

const port = 5000;

app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello world !")
})


app.use('/api/create-user', createuser);



//app.use(middleware.decodeToken)



//app.get("/api/listfiles")

//app.get("/api/uploadfile")

//app.get("/api/downloadfile")


//app.get("/api/deletefile")





app.listen(port, () => {
    
    console.log(`server is listening on ${port}`);

});

