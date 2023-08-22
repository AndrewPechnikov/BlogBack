import express from "express"
import mongoose from "mongoose"
import { registrValidation, loginValidation, postCreateValidation } from "./validations/validations.js"
import checkAuth from "./utils/checkAuth.js";

import * as UserControl from "./controlers/UserController.js"
import * as PostControl from "./controlers/PostController.js"

mongoose.connect('mongodb+srv://admin:3141271828@cluster0.cv1423j.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => {
        console.log("DB is ok")
    })
    .catch((err) => {
        console.log("DB error", err)
    });

const app = express();

app.use(express.json())

app.get('/auth/me', checkAuth, UserControl.getMe)
app.post('/auth/login', loginValidation, UserControl.login)
app.post('/auth/registr', registrValidation, UserControl.registr)

app.get('/posts', PostControl.getAll)
app.get('/posts/:id', PostControl.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostControl.create)
app.delete('/posts/:id', checkAuth, PostControl.remove)
app.patch('/posts/:id', checkAuth, PostControl.update)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("Server OK")
});
