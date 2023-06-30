//create an express app

import express from "express";
import cors from "cors";
const middleware = require("./middleware/index");

const app = express();

const port = 5000;

app.use(cors())

app.use(middleware.decodeToken)





app.get("/api/check", (req, res) => {
    //console.log(req.headers)



    return res.json({ message: `Hello you are authorized !` });

});

//app.get("/api/listfiles")

//app.get("/api/uploadfile")

//app.get("/api/downloadfile")


//app.get("/api/deletefile")





app.listen(port, () => {
    
    console.log(`server is listening on ${port}`);

});

