const express =require("express")
const { test, createChallenge, getChallenges, updateChallenge, addCompleters, getCompleters, addFounders, getFounders, addSubscribers, getSubscribers, adminSignup, adminSignin, deleteChallenge, deleteCompleters, deleteFounders } = require("../controllers/admin.controller")

const adminRouter=express.Router()

adminRouter.get("/test",test)
adminRouter.post('/signup',adminSignup)
adminRouter.post('/signin',adminSignin)
adminRouter.post("/challenges",createChallenge)
adminRouter.get("/challenges",getChallenges)
adminRouter.put("/update/:challengeId",updateChallenge)
adminRouter.delete("/delete/challenge/:challengeId",deleteChallenge)
adminRouter.delete("/delete/completer/:completerId",deleteCompleters)
adminRouter.delete("/delete/founder/:founderId",deleteFounders)

adminRouter.post("/completers",addCompleters)
adminRouter.get("/completers",getCompleters)
adminRouter.post("/founders",addFounders)
adminRouter.get("/founders",getFounders)
adminRouter.post("/subscribers",addSubscribers)
adminRouter.get("/subscribers",getSubscribers)

module.exports={
    adminRouter
}