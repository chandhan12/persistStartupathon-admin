const mongoose=require("mongoose")

const AdminSchema=mongoose.Schema({
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const Admin=mongoose.model("Admin",AdminSchema)

module.exports={
    Admin

}