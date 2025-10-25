const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB is successfully connected");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};

module.exports = ConnectDb;
