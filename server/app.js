const express=require("express")
const connectDB = require("./config/db")
const dotenv=require("dotenv")
const dns=require("dns")
const courseRoute = require("./routes/courseRoute")
const app=express()

dotenv.config()
dns.setServers(["1.1.1.1","8.8.8.8"])

app.use("/api/courses",courseRoute)

// app.get("/welcome",(req,res)=>{
//     res.send("Welcome")
// })
connectDB()

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})