var http = require("http"),
	url = require("url"),
	path = require("path"),
	dataParser = require("./dataParser"),
	resourceProcessor = require("./staticResourceProcessor"),
	calculatorProcessor = require("./calculatorProcessor"),
	appEngine = require("./appEngine.js");

String.prototype.toNumber = function(){
	return parseInt(this,10);
};
appEngine.addTask(dataParser);
appEngine.addTask(resourceProcessor);
appEngine.addTask(calculatorProcessor);
appEngine.addTask(function(req,res){
	res.statusCode = 404;
	res.end();
});


var server = http.createServer(appEngine.run());
server.listen(9090);
console.log("Server listening on port 9090");