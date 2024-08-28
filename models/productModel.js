const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: false,
        validate: [arrayLimit, 'You can pass only up to 5 product images'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    }
});

function arrayLimit(val) {
    return val.length <= 5;
}

module.exports = mongoose.model('Product', productSchema);
