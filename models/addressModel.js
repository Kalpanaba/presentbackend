const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    address_line_1: {
        type: String,
        required: true,
    },
    address_line_2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        enum: ['Home', 'Work'],
        required: true,
    },
});

module.exports = mongoose.model('Address', addressSchema);
