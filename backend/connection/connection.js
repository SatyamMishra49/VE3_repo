const mongoose = require("mongoose");


const connection = async() => {
    try {
        const response = await mongoose.connect(`${process.env.MONGO_URI}`);
        if (response) {
            console.log("connected to db")
        } 
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message: "internal server error"})
    }
}
connection();