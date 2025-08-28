import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//configuring cors so that front end can access backend
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//limiting ki how much json file can be requested so that app does not crash
app.use(express.json({limit: "16kb"}))

//handling data request through url
app.use(express.urlencoded({extended: true, limit: "16kb"}))

//to store public assets like image video and pdf
app.use(express.static("public"))

//handling cookies in browser by server
app.use(cookieParser())

export default app