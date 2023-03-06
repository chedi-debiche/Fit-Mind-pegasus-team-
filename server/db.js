



// import dotenv from 'dotenv'
// dotenv.config() // load the environment variables from the .env file
// import { env } from 'process';
// import dotenv from 'dotenv'
const mongoose = require('mongoose');

const dotenv = require("dotenv");
dotenv.config();

// DB = process.env.DBURL
// db = process.env.DBURL




module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {

	//console.log(process.env.DB);
       //mongoose.connect("mongodb://localhost:27017/fitmind", connectionParams);
       mongoose.connect(process.env.DBURL, connectionParams);

    console.log('Connected to database successfully');
  } catch (error) {
    console.log(error);
    console.log('Could not connect to database!');
  }
};
