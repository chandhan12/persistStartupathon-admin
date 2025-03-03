const express =require("express")
const { test, createChallenge, getChallenges, updateChallenge, addCompleters, getCompleters, addFounders, getFounders, addSubscribers, getSubscribers, adminSignup, adminSignin, deleteChallenge, deleteCompleters, deleteFounders, verifyAdmin } = require("../controllers/admin.controller")

const adminRouter=express.Router()

adminRouter.get("/test",test)

adminRouter.post('/signin',adminSignin)
adminRouter.post("/challenges",verifyAdmin, createChallenge)
adminRouter.get("/challenges",verifyAdmin ,getChallenges)
adminRouter.put("/update/:challengeId",verifyAdmin,updateChallenge)
adminRouter.delete("/delete/challenge/:challengeId",verifyAdmin,deleteChallenge)
adminRouter.delete("/delete/completer/:completerId",verifyAdmin,deleteCompleters)
adminRouter.delete("/delete/founder/:founderId",verifyAdmin,deleteFounders)

adminRouter.post("/completers",verifyAdmin,addCompleters)
adminRouter.get("/completers",verifyAdmin,getCompleters)
adminRouter.post("/founders",verifyAdmin,addFounders)
adminRouter.get("/founders",verifyAdmin,getFounders)
adminRouter.post("/subscribers",verifyAdmin,addSubscribers)
adminRouter.get("/subscribers",verifyAdmin,getSubscribers)

module.exports={
    adminRouter
}