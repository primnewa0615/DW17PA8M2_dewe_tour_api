const express = require("express");
const router = express.Router();

const { getUsers, deleteUsers } = require("../controllers/cUsers");
const { getCountry, getDetailCountry, addCountry, editCountry } = require("../controllers/cCountry");

router.get("/users", getUsers);
router.delete("/users/:id", deleteUsers);
router.get("/country", getCountry);
router.get("/contry/:id", getDetailCountry);
router.post("/country", addCountry);
router.patch("/country/:id", editCountry);

module.exports = router;