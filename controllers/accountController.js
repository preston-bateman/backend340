const utilities = require("../utilities/")



/* **************************************
*  Deliver login view
* ************************************* */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  }

  /* **************************************
*  Deliver Registration view
* ************************************* */
async function buildRegistration(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/registration", {
    title: "Registration",
    nav,
    errors: null,
  })
}
  
  module.exports = { buildLogin, buildRegistration }