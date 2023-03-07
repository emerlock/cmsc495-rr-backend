const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
  .catch(err => console.log(err))
  
const connectDB = mongoose.connection;

connectDB.once('open', function(callback) {
  //The code in this asynchronous callback block is executed after connecting to MongoDB. 
      console.log('Successfully connected to MongoDB.');
  });

module.exports = connectDB