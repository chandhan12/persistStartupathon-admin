const express =require("express")
const { test, createChallenge } = require("../controllers/admin.controller")

const adminRouter=express.Router()

adminRouter.get("/test",test)
adminRouter.post("/challenges",createChallenge)

module.exports={
    adminRouter
}