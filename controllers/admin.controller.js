const { Challenges } = require("../Models/challenges")


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
    res.status(200).send({
        msg:"challenge created successfully"
    })

   } catch (error) {
    res.status(500).send({
        error:error.message

    })
    
   }

}

module.exports={
    test,
    createChallenge
}