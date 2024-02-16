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
            .isLength({ min:2 })
            .isAlpha()
            .withMessage("Please Enter in a valid classification name")
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
        let nav = await utilities.nav()
        res.render("inventory/add-classification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name
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
            .withMessage("Please enter a valid vehicle make."),
        body("inv_model")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please enter a valid vehicle model."),
        body("inv_year")
            .trim()
            .isLength({ max: 4, min: 4 })
            .withMessage("Please enter a valid vehicle year."),
        body("inv_description")
            .trim()
            .isLength({ max: 150, min: 1 })
            .withMessage("Please enter a valid vehicle description."),
        body("inv_image")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please enter a valid vehicle image."),
        body("inv_thumbnail")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please enter a valid vehicle thumbnail."),
        body("inv_price")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please enter a valid vehicle price."),
        body("inv_miles")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please enter a valid vehicle miles."),
        body("inv_color")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please enter a valid vehicle color."),
    ]
}