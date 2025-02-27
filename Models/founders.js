const mongoose=require("mongoose")

const FoundersSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true
    },
    highlights:{
        type:String,
        required:true
    }
})

const Founders=mongoose.model("Founders",FoundersSchema)

module.exports={
    Founders
}