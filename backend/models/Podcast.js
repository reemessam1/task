const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  title: String,
  artist: String,
  url: String,
});

module.exports = mongoose.model('Podcast', podcastSchema);
