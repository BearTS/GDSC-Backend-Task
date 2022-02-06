const router = require('express').Router();
const Order = require('../models/order');
const { verifyandAuthorize, verifyandSeller, verifyToken } = require('../middleware/verify');

router.post('/', verifyToken, async(req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).send(savedOrder);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', verifyandSeller, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).send(updatedOrder);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/find/:id', verifyandAuthorize, async (req, res) => {
    try {
        const orders = await Order.findById(req.params.id);
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;