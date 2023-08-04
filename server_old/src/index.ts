//create an express app

import express from "express";
import cors from "cors";
//import middleware from "./middleware/index";
import admin from "firebase-admin";
import { readdirSync, rmSync, writeFileSync, mkdirSync } from "fs";
//import the realtime database
import { router as indexRoute } from './routes/createuser';


console.log("Hello world !")

var serviceAccount = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cloudapp-b1e10-default-rtdb.europe-west1.firebasedatabase.app"
});


const app = express();

const port = 5000;

app.use(cors())


app.use('/api', createUser);







//app.use(middleware.decodeToken)



//app.get("/api/listfiles")

//app.get("/api/uploadfile")

//app.get("/api/downloadfile")


//app.get("/api/deletefile")





app.listen(port, () => {
    
    console.log(`server is listening on ${port}`);

});

