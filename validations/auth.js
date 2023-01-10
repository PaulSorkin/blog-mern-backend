import {body} from "express-validator";

export const registerValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'Password should be at least 5 characters long').isLength({min: 5}),
    body('fullName', 'Real name is required').isLength({min: 3}),
    body('avatarUrl', 'Invalid source').optional().isURL(),
];