const express = require('express');
const adminRoutes = require('../controllers/admin');
const authorize = require("./../middleware/auth");
const router = express.Router();

// //POST => /admin/addadmin => REGISTER AN ADMIN
// router.post('/addadmin', adminRoutes.addAdmin);

//ADMIN PRODUCT ROUTES 
// //POST => /admin/addproduct => ADD A PRODUCT
// router.post('/addproduct',   authorize.auth, authorize.checkadmin, adminRoutes.addProducts);

// //PUT => /admin/id => EDIT A PRODUCT
// router.put('/edit/:id', authorize.auth, authorize.checkadmin, adminRoutes.editProduct);

// //DELETE => /admin/deleteprod/id => DELETE A PRODUCT
// router.delete('/delete-user/:id', authorize.auth, authorize.checkadmin, adminRoutes.deleteProduct);

// //USER ROUTES
// //DELETE => /admin/delete/id => REMOVE A USER
// router.delete('/delete-user/:id', authorize.auth, authorize.checkadmin, adminRoutes.deleteUser);

// //GET => /admin/users => ALL USERS
// router.get('/users', authorize.auth, authorize.checkadmin, adminRoutes.getUsers);


//AGENT ROUTES
// //GET => /admin/agents=> GET A LIST OF AGENTS
// router.get('/agents', authorize.auth, authorize.checkadmin, adminRoutes.getAgents)


//ROUTES BELLOW THIS LINE HAVE THE AUTHENTICATION REMOVED AND SHOULD BE  COMMENTED OUT BEFORE PUSHING TO MASTER
// //POST => /admin/addadmin => REGISTER AN ADMIN
router.post('/addadmin', adminRoutes.addAdmin);

//ADMIN PRODUCT ROUTES 
//POST => /admin/addproduct => ADD A PRODUCT
router.post('/addproduct',    adminRoutes.addProducts);
//PUT => /admin/id => EDIT A PRODUCT
router.put('/edit/:id',  adminRoutes.editProduct);
//DELETE =>/admin/deleteprod?id=12y&color_id=1&image_id=1 => DELETE A PRODUCT
router.delete('/deleteprod/',  adminRoutes.deleteProduct);

//USER ROUTES
//DELETE => /admin/delete/id => REMOVE A USER
router.delete('/delete-user/:id',  adminRoutes.deleteUser);
//GET => /admin/users => ALL USERS
router.get('/users',  adminRoutes.getUsers);

//AGENT ROUTES
//GET => /admin/agents => GET AGENTS
router.get('/agents', adminRoutes.getAgents)

module.exports = router;