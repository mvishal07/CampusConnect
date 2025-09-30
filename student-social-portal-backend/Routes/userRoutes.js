const express = require('express'); 

const {  getUser } = require('../Controller/user');

const router  = express.Router();
router.get('/:id', getUser);



module.exports = router ;
