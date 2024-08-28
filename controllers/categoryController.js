const Category = require('../models/category');

const addCategory = async (req, res) => {
    try {
        const category = new Category({ name: req.body.name });
        const categoryData = await category.save();
        res.status(200).json({ success: true, msg: 'Category added successfully', data: categoryData });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, msg: "Category data", data: categories });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, msg: 'Category not found' });
        }
        res.status(200).json({ success: true, msg: "Category details", data: category });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const updateData = { name };
        const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!category) {
            return res.status(404).json({ success: false, msg: 'Category not found' });
        }
        res.status(200).json({ success: true, msg: 'Category updated successfully', data: category });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

module.exports = {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
};
