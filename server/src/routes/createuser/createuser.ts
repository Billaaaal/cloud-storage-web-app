import express from "express";
import admin from "firebase-admin";
import { readdirSync, rmSync, writeFileSync, mkdirSync, existsSync } from "fs";

var router = express.Router();

var serviceAccount = require("../../credentials.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cloudapp-b1e10-default-rtdb.europe-west1.firebasedatabase.app"
});
  
  




function createNewUserInDatabase(uid: string) {


    var db = admin.database();
    //for realtime database

    db.ref("users/" + uid)
    .once("value")
    .then(function(snapshot) {
        if (snapshot.exists()) {
            console.log("user already exists")
        }
        else{

            
            db.ref("users/" + uid).set(
                {
                    "isEmpty": "true"
                }
            ).then(() => {
              
              
                createNewUserFolder(uid)
            
            })
            

        }
    })
    
    

}









function createNewUserFolder(uid: string) {


    //create a new user folder inside the file system

    //mkdirSync(`./files_folder/${uid}`)


    if(!existsSync("./files_folder")){

        mkdirSync("./files_folder")

    }

    

    if (readdirSync("./files_folder").includes(uid)) {
        console.log("user folder already exists")
    }
    else{
        mkdirSync(`./files_folder/${uid}`)
        console.log("user folder created")
    }


    

    
    







}









router.post("/", (req, res) => {
    //console.log(req.headers)

    //console.log(req.headers)

    const idToken = req.headers.authorization!.split(' ')[1];
    if(!idToken){
      
        res.status(400).json({ message: `Error` }).send();
    
    }
    else{

                
        console.log("Verifying token...")


        


        admin.
        auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            
    
    //        return res.json({ message: `Welcome, this is the backend ${decodedToken.email}` });
            //createNewUser(uid)

            


            createNewUserInDatabase(uid)

            res.status(200).json({ message: `Success` }).send();



            console.log("Welcome " + decodedToken.email)



        })
        .catch((error) => {
            // Handle error

            res.status(400).json({ message: `Error` }).send();
            
            console.log(error)
            
        });




    }    
    


});

export default router;