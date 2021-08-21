const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.view);
router.post('/', userController.inventory);

router.get('/user', userController.userpage);
router.post('/user', userController.user);

router.get('/logout',userController.logout)

router.get('/admin',userController.adminview)
router.post('/admin',userController.admin)

router.get('/manage',userController.manage)
router.get('/manage/:id', userController.manage);

//router.post('/adminUpdateForm',userController.updateView)
router.post('/adminUpdateForm',userController.update)

router.post('/update',userController.updatedata);

router.post('/delete', userController.delete);

router.get('/rooms',userController.rooms)

router.get('/about',userController.about)

router.get('/contact',userController.contact)
router.post('/contact',userController.contactsub)

router.get('/booking',userController.booking)
router.post('/booking',userController.bookingpost)

router.post('/bookingConfirmation',userController.bookingConfirmation)


module.exports = router;