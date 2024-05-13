const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        unique: true
    },
    important: {
        type: Boolean,
        default: false
    },
    complete: {
        type: Boolean,
        default: false
    }
},
{timestamps: true});
module.exports = mongoose.model("task", taskSchema);