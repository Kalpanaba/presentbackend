const express = require('express');
const multer = require('multer');
const path = require('path');
const { addBanner, getBanners, getBannerById, updateBanner, deleteBanner } = require('../controllers/bannerController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/bannerImages'));
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

router.post('/addBanner', upload.single('image'), addBanner);
router.get('/getBanners', getBanners);
router.get('/getBanner/:id', getBannerById);
router.put('/updateBanner/:id', upload.single('image'), updateBanner);
router.delete('/deleteBanner/:id', deleteBanner);

module.exports = router;
