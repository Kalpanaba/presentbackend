const Product = require('../models/productmodel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dhcy56dwx', 
    api_key: '969783251439845', 
    api_secret: 'DZB2kS0fsuvdW5ScoZb6buXjEZE'
});

const addProduct = async (req, res) => {
    try {
           const { user_id, name, price, category } = req.body;
        if (!user_id || !name || !price || !category) {
            return res.status(400).json({ success: false, msg: 'All fields are required' });
        }

        const arrImages = [];
        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                arrImages.push(result.secure_url);
            }
        }

        const product = new Product({
            user_id,
            name,
            price,
            images: arrImages,
            category,
            status: 'active'
        });

        const productData = await product.save();
        res.status(200).json({ success: true, msg: 'Product added successfully', data: productData });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: 'active' }).populate('category');
        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, msg: 'No products found' });
        }
        res.status(200).json({ success: true, msg: "Product data", data: products });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ success: false, msg: 'Product not found' });
        }
        res.status(200).json({ success: true, msg: "Product details", data: product });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, price, category, status } = req.body;
        const updateData = { name, price, category, status };

        if (req.files && req.files.length > 0) {
            let arrImages = [];
            for (let file of req.files) {
                let result = await cloudinary.uploader.upload(file.path);
                arrImages.push(result.secure_url);
            }
            updateData.images = arrImages;
        }


        const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ success: false, msg: 'Product not found' });
        }
        res.status(200).json({ success: true, msg: 'Product updated successfully', data: product });
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(400).json({ success: false, msg: error.message });
    }
};

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
};
