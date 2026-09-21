const express=require("express")
const app=express()

app.get("/welecome",(req,res)=>{
    res.json("Welcome")
})


