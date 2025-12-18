const express = require("express");

const {
	getVacancies,
	getVacancy,
	createVacancy,
	updateVacancy,
	deleteVacancy,
} = require("../controllers/vacancyController");

const router = express.Router();

router.get("/", getVacancies);

router.get("/:id", getVacancy);

router.post("/", createVacancy);

router.put("/:id", updateVacancy);

router.delete("/:id", deleteVacancy);

module.exports = router;
