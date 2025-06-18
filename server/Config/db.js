const { default: mongoose } = require("mongoose");

exports. Connectdb = async()=>{
    try {
        const connected=await mongoose.connect(process.env.MONGO_URL);
        if(connected){
            console.log("mongoose connected");
        }
    } catch (error) {
        console.log(error);
    }
}

