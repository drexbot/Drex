const mongoose = require('mongoose');

const EmbedSchema = new mongoose.Schema({
    guildId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    fields: [{ name: String, value: String, inline: Boolean }],
    thumbnail: { type: String },
    timestamp: { type: Boolean },
    channelId: { type: String },
    color: { type: String, required: true },
    buttons: [{ label: String, url: String, style: String }],
    responseType: { type: String, enum: ['url', 'response'], required: true },
    responseContent: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Embed', EmbedSchema);