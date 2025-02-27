const express=require("express")
const mongoose =require("mongoose")
require("dotenv").config()

const app=express()
app.use(express.json())
const main=async ()=>{
    
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected to mongodb successfully")
    
    app.listen(3000,()=>{
        console.log("server is started")
    })
    
}
main()

app.get("/",(req,res)=>{

    res.json({
        msg:"hey iam working"
    })
})

