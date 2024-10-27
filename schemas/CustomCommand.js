const mongoose = require('mongoose');

const customCommandSchema = new mongoose.Schema({
  guildId: String,
  commandName: String,
  prefix: String,
  contentEnabled: Boolean,
  contentText: String,
  embedEnabled: Boolean,
  embed: {
    title: String,
    description: String,
    image: String,
    thumbnail: String
  }
});

module.exports = mongoose.model('CustomCommand', customCommandSchema);
