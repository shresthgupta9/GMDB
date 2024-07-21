const router = require("express").Router();
const { check } = require("express-validator");

const gameDetailController = require("../controllers/gamedetail_controller");
const gameSearchController = require("../controllers/gamesearch_controller");

const validateInputUtil = require("../utils/validateinput_util");

const { isLoggedIn } = require("../middlewares/auth_middleware");

router.get("/guid/:guid",
    isLoggedIn,
    gameDetailController
);

router.get("/search",
    isLoggedIn,
    [
        check("q", "parameter is required").notEmpty()
    ],
    validateInputUtil,
    gameSearchController
)

module.exports = router;