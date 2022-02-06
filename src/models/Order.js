const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        user: { type: String, required: true },
        items: [{
            itemId: { type: String },
            quantity: { type: Number, default: 1 },
        },],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: 'Order Pending' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);