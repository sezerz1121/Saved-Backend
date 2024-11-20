import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb" }));
app.use(express.static("public"));
app.use(cookieParser());



// import routes

import userRouter from "./routes/users.routes.js";
import saveRouter from "./routes/saved.routes.js"


// routes declaration

app.use("/users",userRouter);
app.use("/save",saveRouter);


export {app} 

