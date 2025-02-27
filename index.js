const express=require("express")
const mongoose =require("mongoose")
const { adminRouter } = require("./Routes/AdminRouter")
require("dotenv").config()

const app=express()
app.use(express.json())



app.use("/api/admin",adminRouter)
const main=async ()=>{

    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected to mongodb successfully")
    
    app.listen(3000,()=>{
        console.log("server is started")
    })
    
}
main()


