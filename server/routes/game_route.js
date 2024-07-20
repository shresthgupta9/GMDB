const router = require("express").Router();

const gameDetailController = require("../controllers/gamedetail_controller");

router.get("/:guid",
    gameDetailController
);

module.exports = router;