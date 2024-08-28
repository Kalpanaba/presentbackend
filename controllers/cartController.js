const Cart = require('../models/cartModels');
const Product = require('../models/productmodel');

const addItemToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const user_id = userId;
        const product_id = productId;
// console.log(req.body);
// console.log(product_id);
// console.log(user_id); 
// console.log(productId);
// console.log(userId);
// Check if product exists 
        const product = await Product.findById(product_id);
        if (!product) {
            console.log("response is false :",product);
            return res.status(404).json({ success: false, msg: 'Product not found' });
        }

        // Find or create cart for the user
        let cart = await Cart.findOne({ user_id });
        if (!cart) {
            cart = new Cart({ user_id, items: [] });
        }
         
        // Calculate the total price for the product based on quantity
        const totalItemPrice = product.price * quantity;

        // Check if item already exists in the cart
        const existingItemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);
        if (existingItemIndex > -1) {
            // Update quantity and total price
            cart.items[existingItemIndex].quantity += quantity;
            cart.items[existingItemIndex].totalPrice += totalItemPrice;
        } else {
            cart.items.push({ product_id, quantity, totalPrice: totalItemPrice });
        }

        await cart.save();
        res.status(200).json({ success: true, msg: 'Item added to cart', data: cart });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};


const getCartItems = async (req, res) => {
    try {
        const { user_id } = req.params;

        const cart = await Cart.findOne({ user_id }).populate('items.product_id');
        if (!cart) {
            return res.status(404).json({ success: false, msg: 'Cart not found' });
        }

        // Calculate total cart price
        const totalCartPrice = cart.items.reduce((total, item) => total + item.totalPrice, 0);

        res.status(200).json({ success: true, msg: 'Cart items retrieved', data: { cart, totalCartPrice } });
    } catch (error) {
         return res.status(400).json({success:false, msg:error.message});
        
    }
};


const updateCartItem = async (req, res) => {
    try {
        const { user_id, product_id } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findOne({ user_id });
        if (!cart) {
            return res.status(404).json({ success: false, msg: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, msg: 'Item not found in cart' });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        res.status(200).json({ success: true, msg: 'Cart item updated', data: cart });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};





const removeItemFromCart = async (req, res) => {
    try {
        const { user_id, product_id } = req.params;

        const cart = await Cart.findOne({ user_id });
        if (!cart) {
            return res.status(404).json({ success: false, msg: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.product_id.toString() !== product_id);
        await cart.save();
        res.status(200).json({ success: true, msg: 'Item removed from cart', data: cart });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};



const clearCart = async (req, res) => {
    try {
        const { user_id } = req.params;

        await Cart.findOneAndUpdate({ user_id }, { items: [] });
        res.status(200).json({ success: true, msg: 'Cart cleared' });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};



module.exports ={
clearCart,
removeItemFromCart,
updateCartItem,
getCartItems,
addItemToCart

}