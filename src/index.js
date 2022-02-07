require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB Connection Successfull!')).catch((err) => {console.log(err); });

app.use(express.json());
app.use(express.static('../public/'));

app.use('/api/item', require('./routes/item'));
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/authenticate'));
app.use('/api/order', require('./routes/order'));
app.use('/api/cart', require('./routes/cart'));

app.get('*', (req, res) => {
    res.status(404).sendFile('../public/404.html');
});

app.listen(Port, () => {
    console.log('Listening on Port' + Port);
});
