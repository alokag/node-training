var url = require("url"),
	calculator = require("./calculator");


String.prototype.toNumber = function(){
	return parseInt(this,10);
};

function process(req,res, next){
    var data = req.url.query;
    console.log("calc process called",data);
    var result = calculator[data.op](data.n1.toNumber(), data.n2.toNumber());
    res.write(result.toString());
    res.end();
    
    //new step added
    if(typeof(next) =="function") next();    
    
}

module.exports = {
	process : process
};