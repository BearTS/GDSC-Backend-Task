const router = require('express').Router();
const Items = require('../models/Items');
const { verifyandSeller } = require('../middleware/verify');

router.post('/', verifyandSeller, async (req, res) => {
    const newItem = new Items(req.body);
    try {
        const savedItem = await newItem.save();
        res.status(200).send(savedItem);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/', verifyandSeller, async(req, res) => {
    try {
        const items = await Items.find();
        res.status(200).send(items.slice(0, 10));
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/find/:id', async(req, res) => {
    try {
        const item = await Items.findById(req.params.id);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', verifyandSeller, async (req, res) => {
    try {
        const updatedItem = await Items.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).send(updatedItem);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/:id', verifyandSeller, async (req, res) => {
    try {
        await Items.findByIdAndDelete(req.params.id);
        res.status(200).send('Item deleted');
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
