const mongoose = require("mongoose")
// const mongoURI="mongodb://localhost:27017/SolvMate"
const mongoURI="mongodb+srv://rijwansk329:SKRIJWAN%402006@clusterdb.7cmvf.mongodb.net/SolveMate"

connectserver=async ()=>{
    try{
        await mongoose.connect(mongoURI)
        console.log("The server is run.");
    }catch(error){
        console.log(error);
    }
}

module.exports= connectserver