var url = require("url"),
	qs = require("querystring");

function parse(req,res, next){
	req.url = url.parse(req.url, true);
	if (req.method==="POST"){
		var data = '';
		req.on("data", function(dataChunk){
			data += dataChunk;
		});
		req.on("end", function(){
			console.log(data);
			req.url.query = qs.parse(data);
			next();
		});	
	} else {
		next();
	}	
}

module.exports = parse;