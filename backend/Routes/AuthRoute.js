const {Signup , Login } = require("../Controler/AuthController") ;
const router = require("express").Router();

router.post("/Auth/Signup", Signup);
router.post("/Auth/Login", Login);

module.exports = router;