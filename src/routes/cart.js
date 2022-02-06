const router = require('express').Router();
const Cart = require('../models/cart');
const { verifyToken, verifyandAuthorize } = require('../middleware/verify');

router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).send(savedCart);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', verifyandAuthorize, async (req, res) => {
    try {
        const update = await Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).send(update.slice(0, 10));
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/find/:id', verifyandAuthorize, async (req, res) => {
    try {
        const cart = await Cart.findById({ user: req.params.id });
        res.status(200).send(cart.slice(0, 10));
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/:id', verifyandAuthorize, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).send('Cart deleted');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;