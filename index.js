const express=require("express")

const app=express()

app.get("/",(req,res)=>{

    res.json({
        msg:"hey iam working"
    })
})


app.listen(3000,()=>{
    console.log("server is started")
})