const Address = require('../models/addressModel');

// Add a new address
const addAddress = async (req, res) => {
    try {
        const { user_id, full_name, phone_number, pincode, address_line_1, address_line_2, city, state, country, landmark, type } = req.body;

        const address = new Address({
            user_id,
            full_name,
            phone_number,
            pincode,
            address_line_1,
            address_line_2,
            city,
            state,
            country,
            landmark,
            type,
        });

        await address.save();
        res.status(201).json({ success: true, msg: 'Address added', data: address });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

// Get all addresses for a user
const getUserAddresses = async (req, res) => {
    try {
        const { user_id } = req.params;

        const addresses = await Address.find({ user_id });
        res.status(200).json({ success: true, msg: 'Addresses retrieved', data: addresses });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

// Update an address
const updateAddress = async (req, res) => {
    try {
        const { address_id } = req.params;
        const updates = req.body;

        const address = await Address.findByIdAndUpdate(address_id, updates, { new: true });
        if (!address) {
            return res.status(404).json({ success: false, msg: 'Address not found' });
        }

        res.status(200).json({ success: true, msg: 'Address updated', data: address });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

// Remove an address
const removeAddress = async (req, res) => {
    try {
        const { address_id } = req.params;

        const address = await Address.findByIdAndDelete(address_id);
        if (!address) {
            return res.status(404).json({ success: false, msg: 'Address not found' });
        }

        res.status(200).json({ success: true, msg: 'Address removed' });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
         
    }
};

module.exports = {
    addAddress,
    getUserAddresses,
    updateAddress,
    removeAddress,
};
