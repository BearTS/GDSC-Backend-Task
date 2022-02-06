require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB Connection Successfull!')).catch((err) => {console.log(err); });

app.use(express.json());
app.listen(process.env.PORT || 3000, () => {
    console.log('I am Alive!');
});
