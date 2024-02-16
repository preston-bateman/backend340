const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null,
  })
}

/* ***************************
 *  Build inventory details view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInvByInvId(inv_id)
  const details = await utilities.buildDetails(data)
  let nav = await utilities.getNav()
  const name = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`
  res.render("./inventory/details", {
    title: name,
    nav,
    details,
    errors: null,
  })
}

/* ***************************
 *  Deliver inventory management view
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Deliver add classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Deliver add inventory view
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classSelector = await utilities.getClassifications()
  res.render("./inventory/add-inventory", {
    title: "Add New Vehicles to Inventory",
    nav,
    classSelector,
    errors: null,
  })
}

/* ***************************
 *  Adds new classification and handles errors
 * ************************** */
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body
  const addResult = await invModel.addClassification(classification_name)
  let nav = await utilities.getNav()

  if(addResult){
    req.flash(
      "notice",
      `Congratulations, you\'ve added ${classification_name} to the site.`
    )
    res.status(201).render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } else {
    req.flash(
      "notice",
      "Sorry, that classification did not work. Try Again",
      )
      res.status(501).render("./inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null,
      })
  }
}

/* ***************************
 *  Adds new inventory and handles errors
 * ************************** */
invCont.addInventory = async function (req, res) {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  } = req.body
  let nav = await utilities.getNav()
  const invResult = await invModel.addInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )
  if(invResult) {
    req.flash(
      "notice",
      `You have successfully added the ${inv_year + " " + inv_model} to the inventory`
    )
    res.status(201).render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } else {
    req.flash(
      "notice",
      "There was an error processing your request. Please try again"
    )
    res.status(501).render("./inventory/add-inventory", {
      title: "Add New Vehicles to Inventory",
      nav,
      errors: null
    })
  }
}

module.exports = invCont