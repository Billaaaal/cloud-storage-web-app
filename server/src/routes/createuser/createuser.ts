import express from "express";
import admin from "firebase-admin";
import { readdirSync, rmSync, writeFileSync, mkdirSync } from "fs";

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
                    "isEmpty": true
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
    if(!idToken) return res.json({ message: `Hello you are not authorized` });

    console.log("Verifying token...")


    admin.
    auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
        const uid = decodedToken.uid;
        
  
        console.log("Welcome "+ decodedToken.email)
//        return res.json({ message: `Welcome, this is the backend ${decodedToken.email}` });
        //createNewUser(uid)

        createNewUserInDatabase(uid)



    })
    .catch((error) => {
        // Handle error
    });




    return res.json({ message: `Hello you are authorized !` });

});

export default router;