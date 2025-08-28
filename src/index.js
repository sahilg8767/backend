
import dotenv from "dotenv";
dotenv.config();                  // or { path: "./.env" }

import connectDB from "./db/index.js";
connectDB();
