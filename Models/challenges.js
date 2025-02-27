const mongoose=require("mongoose")


const challengesSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,

    },

    funding:{
        type:Number,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    ReviewVideo:{
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