const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
var uniqueValidator = require('mongoose-unique-validator');



// this will be our data base's data structure 
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    classes: Array
  },
  { timestamps: true }
);
UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema, "users");