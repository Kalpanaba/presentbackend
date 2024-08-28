const express = require('express');
const { addItemToCart, getCartItems, updateCartItem, removeItemFromCart, clearCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/add', addItemToCart);
router.get('/:user_id', getCartItems);
router.put('/update/:user_id/:product_id', updateCartItem);
router.delete('/remove/:user_id/:product_id', removeItemFromCart);
 

module.exports = router;
