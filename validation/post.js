const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateInput(data) {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.description = !isEmpty(data.description) ? data.description : "";

    if (!Validator.isLength(data.title, { min: 3, max: 25 })) {
        errors.title = "Title must be at least 3 characters";
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = "Your project must have a description"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};