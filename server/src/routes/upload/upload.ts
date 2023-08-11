import express from "express";
import admin from "firebase-admin";
import { readdirSync, rmSync, writeFileSync, mkdirSync, existsSync } from "fs";
import multer from 'multer'



var router = express.Router();

var serviceAccount = require("../../credentials.json");



  

const upload = multer();



function writeFileToDisk(uid: string, filePath: string, fileName: string, fileBuffer: any) {


    console.log("Writing file to disk...")
    console.log(filePath + fileName)

    mkdirSync("files_folder/" + uid + filePath, { recursive: true })

    writeFileSync("files_folder/" + uid + filePath + fileName, fileBuffer)

}

function convertSize(sizeToConvert: number) {
      var units = ['B', 'KB', 'MB', 'GB', 'TB'],
          bytes = sizeToConvert,
          i;
    
      for (i = 0; bytes >= 1024 && i < 4; i++) {
          bytes /= 1024;
      }
    
      return bytes.toFixed(1) + units[i];
    }


function createFileRecordInDB(uid: string, filePath: string, fileName: string, fileBuffer: any) {


    var db = admin.database();
    //for realtime database

    db.ref("users/" + uid)
    .once("value")
    .then(function(snapshot) {
        if (!snapshot.exists()) {
            //console.log("user already exists")
            db.ref("users/" + uid + "/My Files").set(
                {
                    "isEmpty": "true"

                }
                
            ).then(() => {
              
              
             //   createNewUserFolder(uid)
            
            })
        
        }
        else{

            const dbRef = "users/" + uid + "/" + filePath + fileName.split('.').join(',') 
            

            console.log("Uploading to " + dbRef)


            db.ref(dbRef).update(
                {
                    "date": Date.now(),
                    "name": fileName,
                    "size" : convertSize(fileBuffer.length),
                    "path": filePath + fileName,
                    "type": "file"
                }
            ).then(() => {
       
                
                writeFileToDisk(uid, filePath, fileName, fileBuffer)
              
                //createNewUserFolder(uid)
            
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





router.post("/", upload.single('file'), (req, res) => {
    //console.log(req.headers)

    //console.log(req.headers)

    //console.log("Uploading...")

    if(!req.file){
        res.status(400).json({ message: `Error` }).send();
    }


    //console.log(req.file?.originalname)

    const fileName = req.file!.originalname

    const fileBuffer = req.file!.buffer

    const filePath = req.body.pathToFile

    //console.log(req.file?.buffer)


    //console.log(req.body.pathToFile)



    const idToken = req.headers.authorization!.split(' ')[1];





    if(!idToken){
      
        res.status(400).json({ message: `Error` }).send();
    
    }
    else{

                
        //console.log("Verifying token...")


        


        admin.
        auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            
    
            //return res.json({ message: `Welcome, this is the backend ${decodedToken.email}` });
            //createNewUser(uid)





            createFileRecordInDB(uid, filePath, fileName, fileBuffer)








            



            res.status(200).json({ message: `Success` }).send();



            //console.log("Welcome " + decodedToken.email)



        })
        .catch((error) => {
            // Handle error

            res.status(400).json({ message: `Error` }).send();
            
            console.log(error)
            
        });




    }    
    


});

export default router;