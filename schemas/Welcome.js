const mongoose = require('mongoose');

const WelcomeSchema = new mongoose.Schema({
  guildID: { type: String, required: true, unique: true },
  enabled: { type: Boolean, default: true },
  backgroundImage: { type: String, required: false },
  logoPosition: {
    x: { type: Number, required: false, default: 50 },
    y: { type: Number, required: false, default: 50 },
  },
  usernamePosition: {
    x: { type: Number, required: false, default: 100 },
    y: { type: Number, required: false, default: 100 },
  },
  text3Position: {
    x: { type: Number, required: false, default: 150 },
    y: { type: Number, required: false, default: 150 },
  },
  // Other fields as needed
});

module.exports = mongoose.model('Welcome', WelcomeSchema);
