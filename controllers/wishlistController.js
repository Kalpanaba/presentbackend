const Wishlist = require('../models/wishlistModels');
const Product = require('../models/productmodel');

const addItemToWishlist = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;

        // Check if product exists
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ success: false, msg: 'Product not found' });
        }

        // Find or create wishlist for the user
        let wishlist = await Wishlist.findOne({ user_id });
        if (!wishlist) {
            wishlist = new Wishlist({ user_id, items: [] });
        }

        // Check if item already exists in the wishlist
        const existingItem = wishlist.items.find(item => item.product_id.toString() === product_id);
        if (existingItem) {
            return res.status(400).json({ success: false, msg: 'Item already in wishlist' });
        }

        wishlist.items.push({ product_id });
        await wishlist.save();
        res.status(200).json({ success: true, msg: 'Item added to wishlist', data: wishlist });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const getWishlistItems = async (req, res) => {
    try {
        const { user_id } = req.params;

        const wishlist = await Wishlist.findOne({ user_id }).populate('items.product_id');
        if (!wishlist) {
            return res.status(404).json({ success: false, msg: 'Wishlist not found' });
        }

        res.status(200).json({ success: true, msg: 'Wishlist items retrieved', data: wishlist });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const removeItemFromWishlist = async (req, res) => {
    try {
        const { user_id, product_id } = req.params;

        const wishlist = await Wishlist.findOne({ user_id });
        if (!wishlist) {
            return res.status(404).json({ success: false, msg: 'Wishlist not found' });
        }

        wishlist.items = wishlist.items.filter(item => item.product_id.toString() !== product_id);
        await wishlist.save();
        res.status(200).json({ success: true, msg: 'Item removed from wishlist', data: wishlist });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const clearWishlist = async (req, res) => {
    try {
        const { user_id } = req.params;

        await Wishlist.findOneAndUpdate({ user_id }, { items: [] });
        res.status(200).json({ success: true, msg: 'Wishlist cleared' });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

module.exports = {
    addItemToWishlist,
    getWishlistItems,
    removeItemFromWishlist,
    clearWishlist
};
