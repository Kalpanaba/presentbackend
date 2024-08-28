const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    items: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            added_at: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
