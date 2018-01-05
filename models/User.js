var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  githubId: String
});

module.exports = mongoose.model('User', UserSchema);