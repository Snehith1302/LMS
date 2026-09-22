const express=require("express")
const connectDB = require("./config/db")
const dotenv=require("dotenv")
const dns=require("dns")
const courseRoute = require("./routes/courseRoute")
const authRoute = require("./routes/authRoutes")

const app=express()

app.use(express.json())
dotenv.config()
dns.setServers(["1.1.1.1","8.8.8.8"])

app.use("/api/courses",courseRoute)
app.use("/api/auth",authRoute)

connectDB()

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})