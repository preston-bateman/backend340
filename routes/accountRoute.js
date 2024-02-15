// Resources
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")

//Login Route
router.get("/login", utilities.handleErrors(accountController.buildLogin))

//Registration Route
router.get("/registration", utilities.handleErrors(accountController.buildRegistration))

//Registration Post
router.post(
    '/registration',
    regValidate.registrationRules(),
    regValidate.checkRegData,
     utilities.handleErrors(accountController.registerAccount)
     )

//process the login attempt
router.post(
    "/login",
    (req, res) => {
        res.status(200).send('login process')
    }
)

//Export Router
module.exports = router;