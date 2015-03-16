var url = require("url"),
	qs = require("querystring"),
	calculator = require("./calculator");

function process(req,res, next){
	if (req.url.pathname === "/calculator"){
		var data = req.url.query;
		var result = calculator[data.op](data.n1.toNumber(), data.n2.toNumber());
		res.write(result.toString());
		res.end();
	} else {
		next();
	}
}

module.exports = process;