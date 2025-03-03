const express =require("express")
const { test, createChallenge, getChallenges, updateChallenge, addCompleters, getCompleters, addFounders, getFounders, addSubscribers, getSubscribers, adminSignup, adminSignin, deleteChallenge, deleteCompleters, deleteFounders, verifyAdmin } = require("../controllers/admin.controller")

const adminRouter=express.Router()

adminRouter.get("/test",test)

adminRouter.post('/signin',adminSignin)
adminRouter.post("/challenges",verifyAdmin, createChallenge)
adminRouter.get("/challenges" ,getChallenges)
adminRouter.put("/update/:challengeId",verifyAdmin,updateChallenge)
adminRouter.delete("/delete/challenge/:challengeId",verifyAdmin,deleteChallenge)
adminRouter.delete("/delete/completer/:completerId",verifyAdmin,deleteCompleters)
adminRouter.delete("/delete/founder/:founderId",verifyAdmin,deleteFounders)

adminRouter.post("/completers",verifyAdmin,addCompleters)
adminRouter.get("/completers",getCompleters)
adminRouter.post("/founders",verifyAdmin,addFounders)
adminRouter.get("/founders",getFounders)
adminRouter.post("/subscribers",verifyAdmin,addSubscribers)
adminRouter.get("/subscribers",getSubscribers)

module.exports={
    adminRouter
}