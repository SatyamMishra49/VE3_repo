const mongoose = require("mongoose");
const task = require("./task");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    task: [
        {
            type: mongoose.Types.ObjectId,
            ref: "tasks"
        }
    ]
});
module.exports = mongoose.model("user", userSchema);