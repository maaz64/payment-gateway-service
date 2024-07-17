const mongoose = require('mongoose');

const connectDB = async () => {
  try {
   
    await mongoose.connect(process.env.MONGO_URL, {

    });

    console.log(`Db connected`);

  } catch (error) {

    console.log(`error in db Connection ${error.message}`);
    
  }
};

module.exports = connectDB;
