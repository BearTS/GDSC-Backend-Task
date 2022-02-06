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
        const page = parseInt(req.query.page) || 0; 
        const limit = parseInt(req.query.limit) || 10;
        await Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .sort({ update_at: -1 })
            .skip(page * limit) 
            .limit(limit)
            .exec((err, doc) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    return res.status(200).json({
                        page: page,
                        total: doc.length,
                        cart: doc
                    });
                }
            });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/find/:id', verifyandAuthorize, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0; 
        const limit = parseInt(req.query.limit) || 10;

        await Cart.findById({ user: req.params.id })
            .sort({ update_at: -1 })
            .skip(page * limit) 
            .limit(limit)
            .exec((err, doc) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    return res.status(200).json({
                        page: page,
                        total: doc.length,
                        cart: doc
                    });
                }
            });
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