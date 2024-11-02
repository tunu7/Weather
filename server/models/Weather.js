const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: String,
  data: Object,
  lastFetched: Date
});

module.exports = mongoose.model('Weather', weatherSchema);
