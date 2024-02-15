// Resources
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")

//Login Route
router.get("/login", utilities.handleErrors(accountController.buildLogin))

//Registration Route
router.get("/registration", utilities.handleErrors(accountController.buildRegistration))

//Export Router
module.exports = router;