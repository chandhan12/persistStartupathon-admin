const express=require("express")
const mongoose =require("mongoose")
const { adminRouter } = require("./Routes/AdminRouter")
require("dotenv").config()
const cors=require("cors")
const cloudinary = require("cloudinary").v2;

const app=express()
app.use(express.json({
    limit:"50mb"
}))
app.use(cors())

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



app.post("/upload", async (req, res) => {
    const { imageUrl } = req.body;

    try {
        const cloudinaryRes = await cloudinary.uploader.upload(imageUrl, {
            folder: "cloudinary-demo",
            public_id: `image-${Date.now()}`
        });

        console.log(cloudinaryRes.secure_url);

        res.status(200).json({
            msg: "Image uploaded successfully",
            url: cloudinaryRes.secure_url
        });
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.use("/api/admin",adminRouter)

const main=async ()=>{

    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected to mongodb successfully")
    
    app.listen(3000,()=>{
        console.log("server is started")
    })
    
}
main()


