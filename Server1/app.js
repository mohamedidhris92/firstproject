const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./userRoutes');

mongoose.connect('mongodb://127.0.0.1:27017/demo').then(() => console.log('Connected!'));//Create a database here "demo" is the database

const server = express();
server.use(cors());
server.use(bodyParser.json());

server.use('/demo', userRoutes); // receive /demo path and send to userRoutes 

server.listen(4546, () => {
  console.log('Server 4546 started');
});
