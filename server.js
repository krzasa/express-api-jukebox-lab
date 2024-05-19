const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const trackRouter = require('./controllers/tracks.js');
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors());
app.use(express.json());

app.use('/tracks', trackRouter)
// Routes go here

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});