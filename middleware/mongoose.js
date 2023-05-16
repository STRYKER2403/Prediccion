const mongoose  = require("mongoose");
 
const connectDb = handler => async (req,res) =>{
    if(mongoose.connections[0].readyState)
    {
        return handler(req,res)
    }

    await mongoose.connect("mongodb://localhost:27017/prediccion");
    
    return handler(req,res);
}

module.exports = connectDb;  
