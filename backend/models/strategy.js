var mongoose=require('mongoose')
var StrategySchema=require('../schemas/strategy')
var Strategy=mongoose.model('Strategy',StrategySchema)

module.exports=Strategy
