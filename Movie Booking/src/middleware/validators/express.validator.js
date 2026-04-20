import { body } from "express-validator";
import mongoose from "mongoose";

export const authValidator = [
    body('userName').trim().notEmpty().withMessage('user name required...'),
    body('email').trim().notEmpty().isEmail().withMessage('Email required...'),
    body('password').trim().notEmpty().isLength({ min: 4 }).withMessage('password required...'),
];

export const userUpdateValidation = [
    body('userName').optional().trim(),
    body('email').optional().trim().isEmail(),
    body('password').optional().isLength({ min: 4 })
];

export const addMovieValidator = [

    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),

    body('description')
        .trim()
        .notEmpty().withMessage('Description is required'),

    body('duration')
        .notEmpty().withMessage('Duration is required')
        .isNumeric().withMessage('Duration must be a number'),

    body('genre')
        .notEmpty().withMessage('Genre is required')
        .isArray({ min: 1 }).withMessage('Genre must be an array'),

    body('language')
        .trim()
        .notEmpty().withMessage('Language is required'),

    body('releaseDate')
        .notEmpty().withMessage('Release date is required')
        .isISO8601().withMessage('Invalid date format'),

    body('rating')
        .optional()
        .isFloat({ min: 0, max: 10 })
        .withMessage('Rating must be between 0 and 10'),
];

export const updateMovieValidator = [

    body('title')
        .optional()
        .trim()
        .isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),

    body('description')
        .optional()
        .trim(),

    body('duration')
        .optional()
        .isNumeric().withMessage('Duration must be a number'),

    body('genre')
        .optional()
        .isArray({ min: 1 }).withMessage('Genre must be an array'),

    body('language')
        .optional()
        .trim(),

    body('releaseDate')
        .optional()
        .isISO8601().withMessage('Invalid date format'),

    body('rating')
        .optional()
        .isFloat({ min: 0, max: 10 })
        .withMessage('Rating must be between 0 and 10'),
];

export const addShowValidator = [

    body('movieId')
        .notEmpty().withMessage('movieId is required'),

    body('screenId')
        .notEmpty().withMessage('screenId is required'),

    body('startTime')
        .notEmpty().withMessage('startTime is required')
        .isISO8601().withMessage('Invalid startTime format'),

    body('endTime')
        .notEmpty().withMessage('endTime is required')
        .isISO8601().withMessage('Invalid endTime format'),

    body('ticketPrice')
        .notEmpty().withMessage('ticketPrice is required')
        .isNumeric().withMessage('ticketPrice must be number'),
];

export const updateShowValidator = [

    body('movieId')
        .optional()
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid movieId'),

    body('screenId')
        .optional()
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid screenId'),

    body('startTime')
        .optional()
        .isISO8601()
        .withMessage('Invalid startTime format'),

    body('endTime')
        .optional()
        .isISO8601()
        .withMessage('Invalid endTime format')
        .custom((value, { req }) => {
            if (req.body.startTime && value) {
                if (new Date(value) <= new Date(req.body.startTime)) {
                    throw new Error('endTime must be greater than startTime');
                }
            }
            return true;
        }),

    body('ticketPrice')
        .optional()
        .isNumeric()
        .withMessage('ticketPrice must be a number')
        .custom((value) => {
            if (value < 0) {
                throw new Error('ticketPrice must be greater than 0');
            }
            return true;
        }),
];

export const addBookingValidator = [

    body('showId')
        .notEmpty().withMessage('showId is required')
        .custom(value => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid showId'),

    body('seats')
        .isArray({ min: 1 }).withMessage('Seats must be a non-empty array'),

    body('seats.*')
        .isString().withMessage('Each seat must be a string')
        .matches(/^[A-Z][0-9]+$/).withMessage('Invalid seat format (e.g. A1, B2)'),

];

export const updateBookingValidator = [

    body('showId')
        .optional()
        .custom(value => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid showId'),

    body('seats')
        .optional()
        .isArray({ min: 1 })
        .withMessage('Seats must be a non-empty array'),

    body('seats.*')
        .optional()
        .isString()
        .withMessage('Each seat must be a string')
        .matches(/^[A-Z][0-9]+$/)
        .withMessage('Invalid seat format (e.g. A1, B2)'),

    body('totalAmount')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Total amount must be a positive number'),

];

export const addScreenValidator = [
    body("screenName")
        .notEmpty()
        .withMessage("Screen name is required")
        .isString()
        .withMessage("Screen name must be a string")
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Screen name must be between 2 to 50 characters")
];

export const updateScreenValidator = [
    body("screenName")
        .optional()
        .isString()
        .withMessage("Screen name must be a string")
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Screen name must be between 2 to 50 characters"),

    body("isDeleted")
        .optional()
        .isBoolean()
        .withMessage("isDeleted must be true or false")
];