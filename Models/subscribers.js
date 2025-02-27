const mongoose=require("mongoose")

const SubscribersSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const Subscribers=mongoose.model("Subscribers",SubscribersSchema)

module.exports={
    Subscribers

}