require('dotenv').config();
const http = require('http');
const express = require('express');
const mongo=require('mongoose');
const mongodbConnection=require('./config/mongoconnection.json');
const bodyParser = require("body-parser");





mongo.connect(mongodbConnection.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log(err);
  });


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'Client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'Client/build/index.html'));
// });



const userRouter = require('./routes/user');
app.use('/user', userRouter);

const server=http.createServer(app);
server.listen(3000,()=>console.log("server run with port 3000"));