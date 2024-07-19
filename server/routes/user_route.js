const router = require("express").Router();
const { body, header } = require("express-validator");

// const isLoggedIn = require("../middlewares/auth_middleware");
const validateInputUtil = require("../utils/validateinput_util");
const { registerController, verifyController } = require("../controllers/register_controller");
const loginController = require("../controllers/login_controller");

router.post(
    "/register",
    [
        body("name", "Name is required").isString(),
        body("email", "Email is required").trim().isEmail(),
        body("password", "Password should be atleast 8 characters").isLength({ min: 8 }),
    ],
    validateInputUtil,
    registerController
);

router.post(
    "/verify",
    [
        body("otp", "Invalid OTP").isLength({ min: 6, max: 6 }),
        header("Authorization", "Token is required").exists(),
    ],
    validateInputUtil,
    verifyController
);

router.post(
    "/login",
    [
        body("email", "Invalid Email or Password").trim().isEmail(),
        body("password", "Invalid Email or Password").isLength({ min: 8 }),
    ],
    validateInputUtil,
    loginController
);

// router.get("/logout", isLoggedIn, logoutUser);

// router.get("/profile", isLoggedIn, getProfile);

// router.put("/profile", isLoggedIn, updateProfile);

module.exports = router;