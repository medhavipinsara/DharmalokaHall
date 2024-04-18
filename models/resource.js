const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    }
});

const resourcemodel = mongoose.model('resources', resourceSchema);

module.exports = resourcemodel;