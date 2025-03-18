const { Admin } = require("../Models/admin")
const { Challenges } = require("../Models/challenges")
const { Completers } = require("../Models/completers")
const { Founders } = require("../Models/founders")
const { Subscribers } = require("../Models/subscribers")
const bcrypt = require('bcrypt')
require("dotenv").config()
const jwt=require("jsonwebtoken")


const test=(req,res)=>{
    res.json({
        msg:"hey iam from admin controllers"
    })
}


// creating admin credentials in database
const createAdmin = async () => {
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const admin = new Admin({ email: process.env.ADMIN_EMAIL, password: hashedPassword });
      await admin.save();
      console.log("Admin user created");
    } else {
      console.log("Admin already exists");
    }
  };
  
 


const adminSignin=async (req,res)=>{
    const { email, password } = req.body;

    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
     
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

const verifyAdmin = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
  
    
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No token provided" });
    }
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.adminId = verified.id
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid or Expired Token" });
    }
  };

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

const getChallenge=async (req,res)=>{
    try {
        const {id}=req.params

    const item=await Challenges.findById(id)

    res.status(200).json({
        item
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

const getCompleted=async (req,res)=>{
    try {
        const {id}=req.params

    const item=await Completers.findById(id)

    res.status(200).json({
        item
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

const getFounder=async (req,res)=>{
    try {
        const {id}=req.params

    const item=await Founders.findById(id)

    res.status(200).json({
        item
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
    // adminSignup,
    createAdmin,
    adminSignin,
    verifyAdmin,
    createChallenge,
    getChallenges,
    deleteChallenge,
    updateChallenge,
    getChallenge,
    addCompleters,
    getCompleters,
    deleteCompleters,
    getCompleted,
    addFounders,
    getFounders,
    getFounder,
    deleteFounders,
    addSubscribers,
    getSubscribers
}