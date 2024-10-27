const mongoose = require('mongoose');

// Define the command schema
const commandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensure command names are unique
    },
    enabled: {
        type: Boolean,
        default: true // Commands are enabled by default
    },
    prefix: {
        type: String,
        default: '' // Default prefix is an empty string
    },
    channels: {
        type: [String], // Array of channel IDs where the command can be used
        default: [] // Default is an empty array
    },
    categories: {
        type: [String], // Array of categories where the command can be used
        default: [] // Default is an empty array
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the model from the schema
const Command = mongoose.model('Command', commandSchema);