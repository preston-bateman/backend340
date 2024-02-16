const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const invModel = require("../models/inventory-model")

/*  **********************************
 *  Classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () =>{
    return [
        body("classification_name")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please Enter in a valid classification name.")
            .custom(value => !/\s/.test(value))
    ]
}

/*  **********************************
 *  Check Classification Data and return errors
 * ********************************* */
validate.checkClassData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name,
        })
        return
    }
    next()
}

/*  **********************************
 *  Inventory Data Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
    return [
        body("inv_make")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Enter a valid vehicle make."),
        body("inv_model")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Enter a valid vehicle model."),
        body("inv_year")
            .trim()
            .isLength({ max: 4, min: 4 })
            .isInt({ min: 1890, max: 2025 })
            .withMessage("Enter a valid vehicle year."),
        body("inv_description")
            .trim()
            .isLength({ max: 200, min: 1 })
            .withMessage("Enter a valid vehicle description."),
        body("inv_image")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Enter a valid vehicle image."),
        body("inv_thumbnail")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Enter a valid vehicle thumbnail."),
        body("inv_price")
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .withMessage("Enter a valid vehicle price."),
        body("inv_miles")
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .withMessage("Enter a valid vehicle miles."),
        body("inv_color")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Enter a valid vehicle color."),
    ]
}

/*  **********************************
 *  Check Inventory Data
 * ********************************* */
validate.checkInvData = async (req, res, next) => {
    const {
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    } = req.body;
  
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav();
      let classSelector = await utilities.getClassifications();
      res.render("./inventory/add-inventory", {
        errors,
        title: "Add Inventory",
        nav,
        classSelector,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
      });
      return;
    }
    next();
  };

  module.exports = validate;