const express = require("express");
const router = express.Router();

const { getUsers, deleteUsers } = require("../controllers/cUsers");

router.get("/users", getUsers);
router.get("/users/:id", deleteUsers);

module.exports = router;