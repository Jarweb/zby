
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var GoodLikeSchema = new Schema({
    customerId:{type: ObjectId, ref: 'Customer'},
    goodId:{type: ObjectId, ref: 'Good'},
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

module.exports = GoodLikeSchema