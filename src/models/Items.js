const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        categories: { type: Array },
        seller: { type: String, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
        sold: { type: Number, required: true, default: 0 },
        
    },
    { timestamps: true }
);

module.exports = mongoose.model('Items', ItemSchema);
