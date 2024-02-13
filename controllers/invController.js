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
  console.log(data)
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory details view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invID
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

module.exports = invCont