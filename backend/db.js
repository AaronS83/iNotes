const mongoose= require("mongoose");
const mongoUri = "mongodb://localhost:27017/inotes"

const connectToMongo = ()=>{
    mongoose.connect(mongoUri, {
      ssl: false, // Assuming you're running MongoDB locally and do not need SSL
      // Note: Remove `tlsInsecure` for production and use proper SSL configuration if needed.
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => console.log("MongoDB connection error:", e.message));
}
module.exports = connectToMongo;