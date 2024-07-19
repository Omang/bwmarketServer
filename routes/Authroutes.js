const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const {registerOwner, registerVisitor, loginUser, 
       updateUser, logout, updatePassword, blockUser, unblockUser, getallUser} = require('../controllers/authController');


router.post('/registerowner', registerOwner);
router.post('/registervistor', registerVisitor);
router.post('/login', loginUser);
router.put('/updateuser', authMiddleware, updateUser);
router.get('/getallusers', authMiddleware, isAdmin, getallUser);
router.put('/blockuser/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblockuser/:id', authMiddleware, isAdmin, unblockUser);
router.put('/updatepassword', authMiddleware, updatePassword);
router.post('/logout', logout);


module.exports = router;