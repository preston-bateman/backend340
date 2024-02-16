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