const { Challenges } = require("../Models/challenges")
const { Completers } = require("../Models/completers")


const test=(req,res)=>{
    res.json({
        msg:"hey iam from admin controllers"
    })
}

const createChallenge=async (req,res)=>{
   try {
    const {title,image,funding,deadline,description,reviewVideo,challengeVideo,status}=req.body

    await Challenges.create({
        title,
        image,
        funding,
        description,
        deadline,
        reviewVideo,
        challengeVideo,
        status

    })
    res.status(200).json({
        msg:"challenge created successfully"
    })

   } catch (error) {
    res.status(500).json({
        error:error.message

    })
    
   }

}

const getChallenges=async (req,res)=>{
   try {
    const challenges=await Challenges.find({})

    res.status(200).json({
        challenges
    })

   } catch (error) {
    res.status(500).json({
        error:ErrorEvent.message

    })
    
   }
}

const updateChallenge=async (req,res) =>{
  try {
    const{challengeId}=req.params
    const {status}=req.body

    if(typeof status!=="boolean"){
        return res.status(400).json({
            msg:"status type should be of boolean value"
        })
    }

    const challenges=await Challenges.findByIdAndUpdate(
        challengeId,
        {
           $set:{ status:status}

        },
        {new:true}
    )

    if(!challenges){
        return res.status(404).json({
            msg:"challenge not found"

        })
    }
    res.status(200).json({
        msg:`challenge updated successfully`, challenges
    })
    

  } catch (error) {
    res.status(500).json({
        error:error.message
    })
    
  }
}

const addCompleters=async (req,res)=>{
   try {
    const {project,image,profile,position,description,funding,profilePicture}=req.body
    

    await Completers.create({
        project,
        profile,
        position,
        image,
        description,
        funding,
        profilePicture
    })

    res.status(200).json({
        msg:"completers added successfully"
    })
   } catch (error) {
    res.status(500).json({
        error:error.message
    })
    
   }
}

const getCompleters=async (req,res)=>{
    try {
        const completers=await Completers.find({})

        res.json({
            completers
        })

    } catch (error) {
        error:error.message
        
    }
}


module.exports={
    test,
    createChallenge,
    getChallenges,
    updateChallenge,
    addCompleters,
    getCompleters
}