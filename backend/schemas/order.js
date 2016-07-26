var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var OrderSchema = new Schema({
  buyerName: String,
  buyerPhone: Number,
  buyerRemark:String,
  customerId: {type: ObjectId, ref: 'Customer'},
  goodId: {type: ObjectId, ref: 'Good'},
  buyDate: String,
  buyNum: {
    type:Number,
    default:0
  },
  sumPrice:{
    type:Number,
    default:0
  },
  goodTitle: String,
  goodName: String,
  goodAddress: String,
  goodTell: Number,
  goodPrice: Number,
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

OrderSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

OrderSchema.statics = {
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

module.exports = OrderSchema