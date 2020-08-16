const express = require("express");
const router = express.Router();

const { getUsers, deleteUsers, register } = require("../controllers/cUsers");
const { getCountry, getDetailCountry, addCountry, editCountry } = require("../controllers/cCountry");
const { getTrip, getDetailTrip, editTrip, addTrip, deleteTrip } = require("../controllers/cTrip");
const { addTransaction, getTransaction, editTransaction, getDetailTransaction } = require("../controllers/cTransaction");

// USER
router.get("/users", getUsers);
router.delete("/users/:id", deleteUsers);
router.post("/register", register);
// COUNTRY
router.get("/country", getCountry);
router.get("/contry/:id", getDetailCountry);
router.post("/country", addCountry);
router.patch("/country/:id", editCountry);
//TRIP
router.get("/trip", getTrip);
router.get("/trip/:id", getDetailTrip);
router.patch("/trip/:id", editTrip);
router.post("/trip", addTrip);
router.delete("/trip/:id", deleteTrip);
// TRANSACTION
router.post("/transaction", addTransaction);
router.get("/transaction", getTransaction);
router.patch("/transaction/:id", editTransaction);
router.get("/transaction/:id", getDetailTransaction);

module.exports = router;