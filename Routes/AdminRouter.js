const express =require("express")
const { test, createChallenge, getChallenges, updateChallenge, addCompleters, getCompleters, addFounders, getFounders } = require("../controllers/admin.controller")

const adminRouter=express.Router()

adminRouter.get("/test",test)
adminRouter.post("/challenges",createChallenge)
adminRouter.get("/challenges",getChallenges)
adminRouter.put("/update/:challengeId",updateChallenge)
adminRouter.post("/completers",addCompleters)
adminRouter.get("/completers",getCompleters)
adminRouter.post("/founders",addFounders)
adminRouter.get("/founders",getFounders)

module.exports={
    adminRouter
}