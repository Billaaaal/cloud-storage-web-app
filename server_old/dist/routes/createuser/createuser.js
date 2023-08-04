"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
function createNewUserInDatabase(uid) {
    var db = admin.database();
    //for realtime database
    if (db.ref("users/" + uid)
        .once("value")
        .then(function (snapshot) {
        if (snapshot.exists()) {
            console.log("user already exists");
        }
        else {
            db.ref("users/" + uid).set({
                "isEmpty": true
            }).then(() => {
                createNewUserFolder(uid);
            });
        }
    })) {
    }
}
function createNewUserFolder(uid) {
    //create a new user folder inside the file system
    //mkdirSync(`./files_folder/${uid}`)
    if (readdirSync("./files_folder").includes(uid)) {
        console.log("user folder already exists");
    }
    else {
        mkdirSync(`./files_folder/${uid}`);
        console.log("user folder created");
    }
}
router.post("/create-user", (req, res) => {
    //console.log(req.headers)
    //console.log(req.headers)
    const idToken = req.headers.authorization.split(' ')[1];
    if (!idToken)
        return res.json({ message: `Hello you are not authorized` });
    console.log("Verifying token...");
    admin.
        auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log("Welcome " + decodedToken.email);
        //        return res.json({ message: `Welcome, this is the backend ${decodedToken.email}` });
        //createNewUser(uid)
        createNewUserInDatabase(uid);
    })
        .catch((error) => {
        // Handle error
    });
    return res.json({ message: `Hello you are authorized !` });
});
exports.default = router;
//# sourceMappingURL=createuser.js.map