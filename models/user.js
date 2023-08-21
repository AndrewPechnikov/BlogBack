import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String, // необов'язкове поле

},
    { timestamps: true, }, //дата створення і оновлення
)

export default mongoose.model("User", UserSchema)