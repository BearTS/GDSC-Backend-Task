const router = require('express').Router();
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const User = require('../models/User');

const secretkey = process.env.SECRET_PASSWORD || 'secret';

router.post('/login', async (req, res) => {
    try {
        
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send({ error: 'User not found!' });
        
        const hash = CryptoJS.AES.decrypt(user.password, secretkey).toString(CryptoJS.enc.Utf8);
        const pass = hash.toString(CryptoJS.enc.Utf8);
        if (pass !== req.body.password) return res.status(400).send({ error: 'Password is incorrect!' });
        
        const token = jwt.sign({ _id: user._id, isSeller: user.isSeller }, secretkey, { expiresIn: '7d' });
        const { password, ...other } = user._doc;

        res.status(200).send({ ...other, user: token });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


router.post('/register', async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, secretkey).toString(),
        isSeller: req.body.isSeller || false
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).send(savedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;