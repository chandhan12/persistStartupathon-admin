const mongoose=require("mongoose")


const challengesSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        required:true
    },

    funding:{
        type:Number,
        required:true
    },
    deadline:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    reviewVideo:{
        type:String,
        required:true
    },
    challengeVideo:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }

})

const Challenges=mongoose.model("Challenges",challengesSchema)

module.exports={
    Challenges
}