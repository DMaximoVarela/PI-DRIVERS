const { Router } = require("express");

const router = Router();

const getDrivers = require("../controllers/getDrivers");
const getDriversById = require("../controllers/getDriverById");
const getDriversByName = require("../controllers/getDriversByName");
const postDriver = require("../controllers/postDriver");
const getTeams = require("../controllers/getTeams");

router.get("/drivers", getDrivers);

router.get("/drivers/:id", getDriversById);

router.get("/driver", getDriversByName);

router.post("/drivers", postDriver);

router.get("/teams", getTeams);

module.exports = router;
