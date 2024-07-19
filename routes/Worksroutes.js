const express = require('express');
const router = express.Router();

const {addProduct, updateProduct, getProduct, orgsworks, 
                deleteProduct} = require('../controllers/worksController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');


router.put('/updateproduct/:id', authMiddleware, updateProduct);
router.get('/orgsworks/:id', orgsworks);
router.get('/getproduct/:id', getProduct);
router.post('/addproduct', authMiddleware, addProduct);
router.post('/deleteproduct', authMiddleware, deleteProduct);

module.exports = router;