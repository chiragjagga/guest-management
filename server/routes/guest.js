const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.view);

router.get('/user', userController.userpage);
router.post('/user', userController.user);

router.get('/logout',userController.logout)
  
module.exports = router;