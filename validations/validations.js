import { body } from "express-validator"

export const loginValidation = [
    body('email', "Не вірний формат пошти").isEmail(),
    body('password', "Пароль повинен бути мінімум 5 символів").isLength({ min: 5 }),
]

export const registrValidation = [
    body('email', "Не вірний формат пошти").isEmail(),
    body('password', "Пароль повинен бути мінімум 5 символів").isLength({ min: 5 }),
    body("fullName", "Ім'я повинне бути мінімум 3 символів").isLength({ min: 3 }),
    body("avatarUrl", "Не вірне посилання на аватарку").optional().isURL(), // .optional, для не обов'язкового параметру
]

export const postCreateValidation = [
    body('title', "Введіть заголовок статті").isLength({ min: 3 }).isString(),
    body('text', "Введіть текст статті").isLength({ min: 10 }).isString(),
    body("tags", "Невірний формат тегів (вкажіть массив)").optional().isString(),
    body("imageUrl", "Не вірне посилання на зображення").optional().isURL(), // .optional, для не обов'язкового параметру
]