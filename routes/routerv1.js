const express = require("express");
const router = express.Router();

const { getUsers, deleteUsers } = require("../controllers/cUsers");
const { getCountry, getDetailCountry, addCountry, editCountry } = require("../controllers/cCountry");
const { getTrip, getDetailTrip, editTrip, addTrip, deleteTrip } = require("../controllers/cTrip");


router.get("/users", getUsers);
router.delete("/users/:id", deleteUsers);
router.get("/country", getCountry);
router.get("/contry/:id", getDetailCountry);
router.post("/country", addCountry);
router.patch("/country/:id", editCountry);
router.get("/trip", getTrip);
router.get("/trip/:id", getDetailTrip);
router.patch("/trip/:id", editTrip);
router.post("/trip", addTrip);
router.delete("/trip/:id", deleteTrip)

module.exports = router;