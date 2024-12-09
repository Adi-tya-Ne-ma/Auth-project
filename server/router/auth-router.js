const express = require("express");
const router = express.Router();
const auth_manager = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const auth_middleware = require("../middlewares/auth-middleware");

// router.get("/", (req, res) => {
//     res
//     .status(200)
//     .send("welcome to ROUTER homepage");
// });

router.route("/").get(auth_manager.home);

router.route("/register").post( validate(signupSchema), auth_manager.register );

router.route("/login").post(auth_manager.login);

router.route("/user").get(auth_middleware, auth_manager.user);

module.exports = router; 