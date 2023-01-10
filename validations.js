import {body} from "express-validator";

export const loginValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'Password should be at least 5 characters long').isLength({min: 5}),
];

export const registerValidation = [
    body('email', 'Wrong email format').isEmail(),
    body('password', 'Password should be at least 5 characters long').isLength({min: 5}),
    body('fullName', 'Real name is required').isLength({min: 3}),
    body('avatarUrl', 'Invalid source').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Type the post title').isLength({ min: 3 }).isString(),
    body('text', 'Type the post text').isLength({min: 10}).isString(),
    body('tags', 'Wrong tags format (should be an Array)').optional().isString(),
    body('imageUrl', 'Invalid source').optional().isString(),
];