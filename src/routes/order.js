require('dotenv').config();
const router = require('express').Router();
const webpush = require('web-push');
const Order = require('../models/order');
const { verifyandAuthorize, verifyandSeller, verifyToken } = require('../middleware/verify');
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
const subscription = {
    endpoint: process.env.SubscriptionURL,
    keys: {
        p256dh: process.env.Public_Encryption_Key,
        auth: process.env.Auth_Key
    }
};


router.post('/', verifyToken, async(req, res) => {
    const newOrder = new Order(req.body);
    try {
        await newOrder.save()
            .then(order => {
                res.status(200).send(order);
            }).then(order => {
                const payload = JSON.stringify({ status: order.status });
                webpush.setVapidDetails(`mailto:${order.seller_email}`, publicVapidKey, privateVapidKey);
                webpush.sendNotification(subscription, payload).catch(error => {
                    console.error(error.stack);
                });
            }).then(order => {
                const payload = JSON.stringify({ status: order.status });
                webpush.setVapidDetails(`mailto:${order.user_email}`, publicVapidKey, privateVapidKey);
                webpush.sendNotification(subscription, payload).catch(error => {
                    console.error(error.stack);
                });
            }).catch(error => {
                console.log(error);
            });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', verifyandSeller, async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then(order => {
                res.status(200).send(order);
            }).then(order => {
                const payload = JSON.stringify({ status: order.status });
                webpush.setVapidDetails(`mailto:${order.seller_email}`, publicVapidKey, privateVapidKey);
                webpush.sendNotification(subscription, payload).catch(error => {
                    console.error(error.stack);
                });
            }).then(order => {
                const payload = JSON.stringify({ status: order.status });
                webpush.setVapidDetails(`mailto:${order.user_email}`, publicVapidKey, privateVapidKey);
                webpush.sendNotification(subscription, payload).catch(error => {
                    console.error(error.stack);
                });
            }).catch(error => {
                console.log(error);
            });
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