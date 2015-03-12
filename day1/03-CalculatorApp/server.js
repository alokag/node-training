var http = require("http"),
	url = require("url"),
	path = require("path"),
	resourceProcessor = require("./staticResourceProcessor"),
	calculatorProcessor = require("./calculatorProcessor"),
    reqProcessor = require("./requestProcessor");

function run(req, res,tasks){
    console.log("_______");
	if (tasks.length === 0) return;
	var first = tasks[0];
	var next = (function(tasks){
		return function(){
			run(req, res,tasks);
		}
	})(tasks.slice(1));
	first(req, res,next);
}

var server = http.createServer(function(req, res){    
    var tasks = [ ];
    //set index.html as default
	req.url = url.parse(req.url, true);
	req.url.pathname = req.url.pathname === "/" ? "/index.html" : req.url.pathname;    
            
	if (resourceProcessor.isStatic(req.url.pathname)){
		tasks = [reqProcessor.process, resourceProcessor.serve];
        run(req, res,tasks);
	} else if (req.url.pathname === "/calculator"){
        tasks = [reqProcessor.process, calculatorProcessor.process];
        console.log("tasks>>",tasks);
        run(req, res, tasks);
	} else {
		res.statusCode = 404;
		res.end();
	}	
});
server.listen(9090);
console.log("Server listening on port 9090");