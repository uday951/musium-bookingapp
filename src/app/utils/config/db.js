const { default: mongoose } = require("mongoose")



const Dbconnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("successfully mongoose connected")
        
    } catch (error) {
        console.log(error)
    }
}

export default Dbconnection;