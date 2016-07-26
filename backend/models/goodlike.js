var mongoose=require('mongoose')
var GoodLikeSchema=require('../schemas/goodlike')
var GoodLike=mongoose.model('GoodLike',GoodLikeSchema)

module.exports=GoodLike
