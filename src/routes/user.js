const router = require('express').Router();
const CryptoJS = require('crypto-js');
const User = require('../models/User');
const { verifyandAuthorize, verifyandAdmin } = require('../middleware/verify');

const secretkey = process.env.SECRET_PASSWORD || 'secret';

router.put('/:id', verifyandAuthorize, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, secretkey).toString();
    }

    try {
        const update = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).send(update);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/find/:id', verifyandAdmin, async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send('User deleted');
    } catch (error){
        res.status(500).send(error);
    }
});

module.exports = router;