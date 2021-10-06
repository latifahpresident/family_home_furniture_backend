const express = require('express');
const usersRoutes = require('../controllers/users');
const router = express.Router();
const isAuthenticated = require("./../middleware/auth");

//GET => /user/firebase_id => USER PROFILE
router.get('/:firebase_id', isAuthenticated.auth, usersRoutes.getUserById);
//GET => /user/id/cart => USER'S CART
router.get('/:id/cart', isAuthenticated.auth, usersRoutes.getCart);
//POST => /user/register => SIGN UP 
router.post('/register', usersRoutes.addUser);
//POST => /user/addtocart/id => ADD ITEM TO CART
router.post('/add-to-cart/:id', isAuthenticated.auth, usersRoutes.addToCart);
//PUT => /user/id => EDIT USER ACCOUNT 
router.put('/:id',  isAuthenticated.auth, usersRoutes.editUser);
//DELETE => /user/id => REMOVE ACCOUNT
router.delete('/:id',  isAuthenticated.auth, usersRoutes.deleteUser);
//DELETE => /user/removefromcart/:id?prod=1 => REMOVE PRODUCT FROM CART
router.delete('/removefromcart/:id', isAuthenticated.auth, usersRoutes.removeFromCart);

module.exports = router;