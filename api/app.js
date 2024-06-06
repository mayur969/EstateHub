import express from "express";
import routes from "./routes/index.route.js";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();

mongoose
    .connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Connected to Database")
    })
    .catch((err)=>{
        console.log(`Error: ${err}`)
    });

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(cookieParser());
app.use("/api", routes);


app.listen(port, ()=> {
    console.log(`server is running on port http://localhost:${port}`);
})