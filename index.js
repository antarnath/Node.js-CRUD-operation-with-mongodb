const express = require('express');
const userRouter = require('./routes/user');
const connectMongoDB = require('./connection');
const {logRegRes} = require('./middlewares');
const mongoose = require('mongoose');

const app = express(); 
const port = 3000;

// connect to MongoDB
connectMongoDB('mongodb://localhost:27017/userdb');

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logRegRes('log.txt'));


app.use('/api/users', userRouter); 



app.listen(port, () => {
  // console.log(user);
  console.log(`Server is ruining on http://localhost:${port}`);
});