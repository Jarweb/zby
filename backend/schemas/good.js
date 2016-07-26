
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var GoodSchema = new Schema({
	city: String,
	tag: String,
	title: String,
	subTitle: String,
	address: String,
	tell: Number,
  name: String,
  poster: String,
	priceA: Number,//原价
	priceB: Number,//折后价
  bed: String,
	include: String,
  buyInfo: String,
  useInfo: String,
	goodTotal: {//该商品总数
		type: Number,
		default: 0
	},
  buyNum:{
    type:Number,
    default:0
  },
  detail: String,
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

GoodSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

GoodSchema.statics = {
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

module.exports = GoodSchema