const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [false, "Please enter a name for the user"]
        },
        email: {
            type: String,
            required: true,
            default: 0
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
            default: 18
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)


const User = mongoose.model('User', userSchema);

module.exports = User;