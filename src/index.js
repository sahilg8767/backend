
import dotenv from "dotenv";
dotenv.config();                  // or { path: "./.env" }

import connectDB from "./db/index.js";

connectDB()
.then(()=>{
    const server=app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    });
    server.on("error", (error)=>{
        console.log("Server error", error);
        throw error
    });
})
.catch((err)=>{
    console.log("Mongodb connection failed", err);
});