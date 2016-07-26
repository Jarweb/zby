
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

var ManagerSchema = new mongoose.Schema({
    password: String,
    password_bcy: String,
    email: String,
    meta: {
	    createAt: {
	      type: Date,
	      default: Date.now()
	    },
	    updateAt: {
	      type: Date,
	      default: Date.now()
	    }
	 }
})

ManagerSchema.pre('save', function(next) {
  var manager = this
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)
    bcrypt.hash(manager.password_bcy, salt, function(err, hash) {
      if (err) return next(err)
      manager.password_bcy = hash
      next()
    })
  })
})

ManagerSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password_bcy, function(err, isMatch) {
      if (err) return cb(err)
      cb(null, isMatch)
    })
  }
}

ManagerSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = ManagerSchema