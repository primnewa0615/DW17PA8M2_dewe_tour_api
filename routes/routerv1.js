const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const multyParty = require('connect-multiparty');
app.use(cors());

const MultyPartyMidleWare = multyParty({ uploadDir: 'imgUpload' });


const { authenticated } = require("../middlewere/auth");
const { getUsers, deleteUsers, register, login, uploadImgProfile, getUserByEmail } = require("../controllers/cUsers");
const { getCountry, getDetailCountry, addCountry, editCountry } = require("../controllers/cCountry");
const { getTrip, getDetailTrip, editTrip, addTrip, deleteTrip, addImageTrip, getTripFromSearch, cancelSumCounterQty } = require("../controllers/cTrip");
const { addTransaction, getTransaction, editTransaction, getDetailTransaction, getDetailTrans, sumCounterQty, uploadImgStruct } = require("../controllers/cTransaction");

// USER
router.patch("/uploadImgProfile", MultyPartyMidleWare, uploadImgProfile)
router.get("/users", getUsers);
router.delete("/users/:id", deleteUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/user/:email", getUserByEmail)
// COUNTRY
router.get("/country", getCountry);
router.get("/contry/:id", getDetailCountry);
router.post("/country", authenticated, addCountry);
router.patch("/country/:id", authenticated, editCountry);
//TRIP
router.get("/trip", getTrip);
router.get("/trip/:key", getTripFromSearch);
router.get("/trips/:id", getDetailTrip);
router.patch("/trip/:id", editTrip);
router.post("/trip", authenticated, addTrip);
router.patch("/imageForm", MultyPartyMidleWare, addImageTrip);
router.delete("/trip/:id", authenticated, deleteTrip);
router.patch("/cancelSumCounterQty/:idTrip", cancelSumCounterQty);
// TRANSACTION
router.post("/transaction", authenticated, addTransaction);
router.get("/transaction", getTransaction);
router.patch("/transaction/:id", authenticated, editTransaction);
router.get("/transac/:id", authenticated, getDetailTrans);
router.get("/transaction/:idUser", authenticated, getDetailTransaction);
router.get("/sumCounterQty/:idTrip", sumCounterQty);
router.patch("/uploadImgStruct", MultyPartyMidleWare, uploadImgStruct)


module.exports = router;