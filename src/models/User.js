const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isSeller: { type: Boolean, default: false },
        isAdmin: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);