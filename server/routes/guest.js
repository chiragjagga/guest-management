const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.view);

router.get('/user', userController.userpage);
router.post('/user', userController.user);

router.get('/logout',userController.logout)

router.get('/admin',userController.adminview)
router.post('/admin',userController.admin)

router.get('/manage',userController.manage)

router.get('/manage/:id', userController.manage);
//router.post('/edituser/:id', userController.update);
  
module.exports = router;