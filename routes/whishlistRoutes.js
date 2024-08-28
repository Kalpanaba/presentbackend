const express = require('express');
const { addItemToWishlist, getWishlistItems, removeItemFromWishlist, clearWishlist } = require('../controllers/wishlistController');

const router = express.Router();

router.post('/add', addItemToWishlist);
router.get('/:user_id', getWishlistItems);
router.delete('/remove/:user_id/:product_id', removeItemFromWishlist);
router.delete('/clear/:user_id', clearWishlist);

module.exports = router;
