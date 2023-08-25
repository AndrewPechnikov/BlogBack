import express from "express"
import mongoose from "mongoose"
import { registrValidation, loginValidation, postCreateValidation } from "./validations/validations.js"

import multer from "multer";
import cors from "cors"


import { PostController, UserController } from "./controllers/index.js";
import { handleValidationErrors, checkAuth } from './utils/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("DB is ok")
    })
    .catch((err) => {
        console.log("DB error", err)
    });

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cd) => {
        cd(null, "uploads")
    },
    filename: (_, file, cd) => {
        cd(null, file.originalname)
    },
});

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static("uploads"))

app.get('/auth/me', checkAuth, UserController.getMe)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/registr', registrValidation, handleValidationErrors, UserController.registr)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/tags', PostController.getLastTags)

app.get('/posts', PostController.getAll)

app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', postCreateValidation, handleValidationErrors, checkAuth, PostController.update)

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("Server OK")
});


