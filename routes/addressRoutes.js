const express = require('express');
const { addAddress, getUserAddresses, updateAddress, removeAddress } = require('../controllers/addressController');

const router = express.Router();

router.post('/add', addAddress);
router.get('/:user_id', getUserAddresses);
router.put('/update/:address_id', updateAddress);
router.delete('/remove/:address_id', removeAddress);

module.exports = router;
