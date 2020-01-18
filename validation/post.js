const Validator = require("validator");
const isEmpty = require("is-empty");

// Export Validation Function
module.exports = function validateInput(data) {

    // Define Errors
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.description = !isEmpty(data.description) ? data.description : "";

    // Title Check
    if (!Validator.isLength(data.title, { min: 3, max: 30 })) {
        errors.title = "Title must be at least 3 characters";
    }

    // Description Check
    if (Validator.isEmpty(data.description)) {
        errors.description = "Your project must have a description"
    }

    // Return Errors and is valid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    };
};