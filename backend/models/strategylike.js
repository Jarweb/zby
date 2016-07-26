var mongoose=require('mongoose')
var StrategyLikeSchema=require('../schemas/strategylike')
var StrategyLike=mongoose.model('StrategyLike',StrategyLikeSchema)

module.exports=StrategyLike
