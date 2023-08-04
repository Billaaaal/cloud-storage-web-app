"use strict";
//create an express app
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//import middleware from "./middleware/index";
const firebase_admin_1 = __importDefault(require("firebase-admin"));
console.log("Hello world !");
var serviceAccount = require("./credentials.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: "https://cloudapp-b1e10-default-rtdb.europe-west1.firebasedatabase.app"
});
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use('/api', createUser);
//app.use(middleware.decodeToken)
//app.get("/api/listfiles")
//app.get("/api/uploadfile")
//app.get("/api/downloadfile")
//app.get("/api/deletefile")
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map