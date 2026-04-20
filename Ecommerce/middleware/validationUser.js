const { body } = require("express-validator");

const userValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail(),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters"),

    body("image")
        .optional()
        .isString()
        .withMessage("Image must be a string (URL or filename)")
];

module.exports = userValidation;
