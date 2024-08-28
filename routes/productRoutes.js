const express = require('express');
const multer = require('multer');
const path = require('path');
const { addProduct, getProducts, getProductById, updateProduct } = require('../controllers/productController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/productImages'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post('/addProduct', upload.array('images', 5), addProduct);
router.get('/getProducts', getProducts);
router.get('/getProduct/:id', getProductById);
router.put('/updateProduct/:id', upload.array('images', 5), updateProduct);
module.exports = router;
