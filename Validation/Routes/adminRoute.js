const express = require("express")
const router = express.Router();
const adminController = require("../controller/adminController")
const signupSchema = require("../validator/adminValidator");
const validate = require("../middlewares/validateMiddleware")


router.route('/').get(adminController.home);

router.route('/register')
  .post(validate(signupSchema),adminController.register);
  
router.route('/login').post(adminController.login);



module.exports = router;