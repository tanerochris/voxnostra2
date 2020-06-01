const mongoose = require('mongoose');
const MediaSchema = require('./media.schema');

delete mongoose.connection.models.Media;

module.exports = mongoose.model('Media', MediaSchema);
