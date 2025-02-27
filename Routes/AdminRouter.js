const express =require("express")
const { test, createChallenge, getChallenges, updateChallenge, addCompleters, getCompleters } = require("../controllers/admin.controller")

const adminRouter=express.Router()

adminRouter.get("/test",test)
adminRouter.post("/challenges",createChallenge)
adminRouter.get("/challenges",getChallenges)
adminRouter.put("/update/:challengeId",updateChallenge)
adminRouter.post("/completers",addCompleters)
adminRouter.get("/completers",getCompleters)

module.exports={
    adminRouter
}