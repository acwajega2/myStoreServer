var express = require('express');
var router = express.Router();




var store_controller = require('../controllers/store_controller.js');









//-------------- routing to user api for New user account Creation ------------------
router.get('/api/stores/getItems',store_controller.GetItems);
//---------------- End of New user account Creation ---------------------------------

//-------------- routing to user api for New user account Creation ------------------
router.get('/api/stores/getCategories',store_controller.GetCategories);
//---------------- End of New user account Creation ---------------------------------

//-------------- routing to user api for New user account Creation ------------------
router.get('/api/stores/getDepartments',store_controller.GetDepartments);
//---------------- End of New user account Creation ---------------------------------


//-------------- routing to user api for New user account Creation ------------------
router.get('/api/stores/getColors',store_controller.GetColors);
//---------------- End of New user account Creation ---------------------------------


//-------------- routing to user api for New user account Creation ------------------
router.post('/api/users/login',store_controller.UserLogin);
//---------------- End of New user account Creation ---------------------------------

//-------------- routing to user api for New user account Creation ------------------
router.post('/api/users/createNewUser',store_controller.CreateNewUser);
//---------------- End of New user account Creation ---------------------------------










module.exports = router;