const express = require('express');
const { addCategory, getCategories, getCategoryById, updateCategory } = require('../controllers/categoryController');

const router = express.Router();

router.post('/addCategory', addCategory);
router.get('/getCategories', getCategories);
router.get('/getCategory/:id', getCategoryById);
router.put('/updateCategory/:id', updateCategory);

module.exports = router;
