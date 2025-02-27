const mongoose=require("mongoose")
const { Challenges } = require("./challenges")


const completersSchema=mongoose.Schema({
    project:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    funding:{
        type:Number,
        required:true
    },
    profilePicture:{
        type:String,
        required:true
    }
})

const Completers=mongoose.model("Completers",completersSchema)

module.exports={
    Completers
}