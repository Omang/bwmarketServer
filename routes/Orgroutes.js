const express = require('express');
const router = express.Router();

const {createOrg, getOrg, updateOrg, deleteOrg, getallOrgs} = require('../controllers/orgController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/createorg',authMiddleware, createOrg);
router.get('/getorg/:id', getOrg);
router.get('/getallorgs', getallOrgs);
router.put('/updateorg', authMiddleware, updateOrg);
router.delete('/deleteorg', authMiddleware, deleteOrg);

module.exports = router;