
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var StrategyLikeSchema = new Schema({
    customerId:{type: ObjectId, ref: 'Customer'},
    strategyId:{type: ObjectId, ref: 'Strategy'},
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

module.exports = StrategyLikeSchema