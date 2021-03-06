const Validator = require("validator");
const isEmpty = require("is-empty");

// Export validation function
module.exports = function validateRegisterInput(data) {

    // Define Errors
    let errors = {};

    // Convert Empty Values to Empty Strings
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Name checks
    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = "First name field is required";
    }

    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = "Last name field is required";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = "Password must be at least 8 characters";
    }

    // Return Errors and is valid boolean
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
