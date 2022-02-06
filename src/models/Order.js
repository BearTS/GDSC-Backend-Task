const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        user_email: { type: String, required: true },
        items: [{
            itemId: { type: String },
            quantity: { type: Number, default: 1 },
        },],
        seller_email: { type: String, required: true },
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: 'Order Pending' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);