const { body } = require("express-validator");

exports.userValidationRules = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Your email looks funky..."),
  body("password")
    .isLength({ min: 10 })
    .withMessage("Minimum password length is 10"),
  body("firstName")
    .exists()
    .trim()
    .escape()
    .withMessage("Please give us your first name.")
];


// const { body, validationResult } = require('express-validator');

// const userValidationRules = () => {
//   return [
//     body('email')
//       .isEmail()
//       .exists()
//       .normalizeEmail()
//       .withMessage('Do you call this an email?'),
//     body('password')
//       .isLength({ min: 10 })
//       .withMessage('Your password should be 10 characters long.'),
//     body('firstName').trim(),
//     body('lastName').trim()
//   ];
// };

// const userValidationErrorHandling = (req, res, next) => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     return next();
//   }

//   res.status(422).json({ errors: errors.array() });

// };

// module.exports = {
//   userValidationRules,
//   userValidationErrorHandling
// };