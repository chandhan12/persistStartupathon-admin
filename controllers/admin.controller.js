const { Admin } = require("../Models/admin")
const { Challenges } = require("../Models/challenges")
const { Completers } = require("../Models/completers")
const { Founders } = require("../Models/founders")
const { Subscribers } = require("../Models/subscribers")
require("dotenv").config()
const jwt=require("jsonwebtoken")


const test=(req,res)=>{
    res.json({
        msg:"hey iam from admin controllers"
    })
}


const adminSignup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingEmail = await Admin.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }

        
        const response = await Admin.create({ email, password });

        res.status(201).json({
            msg: "Admin signup successful",
           
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const adminSignin=async (req,res)=>{
   try {
    const {email,password}=req.body
    console.log(email)
    console.log(password)

    const existingUser=await Admin.findOne({
        email
    })

    if(!existingUser){
       return  res.status(400).json({
            error:"invalid credentials"
        })
    }

    const passwordMatched=existingUser.password===password

    if(passwordMatched){
        const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)

        res.status(200).json({
            msg:"admin login successfull",
            token
        })
    }
   } catch (error) {
    res.status(500).json({
        error:error.message
    })
   }
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

    res.status(200).send({
        challenges:challenges
    })

   } catch (error) {
    res.status(500).json({
        error:error.message

    })
    
   }
}

const deleteChallenge=async (req,res)=>{
    try {
        const {challengeId}=req.params
        const challenges=await Challenges.findByIdAndDelete({
            _id:challengeId
        },
    {new:true}
    )

        res.status(200).json({
            msg:"challenge deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
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
        let { page , limit } = req.query;
        
            page = parseInt(page);
            limit = parseInt(limit);
        const completers=await Completers.find().skip((page - 1) * limit).limit(limit)
        const totalCompleters=await Completers.countDocuments()

        res.json({
            completers,
            hasMore:page*limit<totalCompleters
        })

    } catch (error) {
       res.status(500).json({
        error:error.message
       })
        
    }
}
const deleteCompleters=async (req,res)=>{
    try {
        const {completerId}=req.params
        const completers=await Completers.findByIdAndDelete({
            _id:completerId
        },
    {new:true}
    )

        res.status(200).json({
            msg:"completers deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }

}

const addFounders=async (req,res) =>{
    try {
        const {name,profilePic,position,location,bio,highlights}=req.body

    await Founders.create({
        name,
        profilePic,
        position,
        location,
        bio,
        highlights
    })

    res.status(200).json({
        msg:"Founder added succesfully"
    })

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
        
    }
}

const getFounders=async(req,res)=>{
try {
    let { page , limit } = req.query;
        
            page = parseInt(page);
            limit = parseInt(limit);
   const founders=  await Founders.find().skip((page - 1) * limit).limit(limit)
   const totalFounders=await Founders.countDocuments()

   if(founders.lenght==0){
    return res.status(400).json({
        msg:"no founders found"
    })
   }
   res.status(200).json({
    founders,
    hasMore:page*limit<totalFounders
   })
} catch (error) {
    res.json({
        error:error.message
    })
    
}
}
const deleteFounders=async (req,res)=>{
    try {
        const {founderId}=req.params
        const founders=await Founders.findByIdAndDelete({
            _id:founderId
        },
    {new:true}
    )

        res.status(200).json({
            msg:"founder deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }

}

const addSubscribers=async (req,res)=>{
    try {
        const {name,email}=req.body
        await Subscribers.create({
            name,
            email
        })

    res.status(200).json({
        msg:"subscriber added successfully"
    })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
        
    }
}

const getSubscribers=async (req,res) =>{
   try {
    const subscribers=await Subscribers.find({})
    res.status(200).json({
        subscribers
    })
   } catch (error) {
        res.status(500).json({
            error:error.message
        })
    
   }

}

module.exports={
    test,
    adminSignup,
    adminSignin,
    createChallenge,
    getChallenges,
    deleteChallenge,
    updateChallenge,
    addCompleters,
    getCompleters,
    deleteCompleters,
    addFounders,
    getFounders,
    deleteFounders,
    addSubscribers,
    getSubscribers
}