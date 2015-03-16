var fs = require("fs"),
	url = require("url"),
	path = require("path");

var staticResourceExtns = [".html", ".css", ".js", ".jpg", ".png", ".ico"];

function isStaticResource(resourceName){
	return staticResourceExtns.indexOf(path.extname(resourceName)) !== -1;
}

function serveResource(req,res, next){
	req.url.pathname = req.url.pathname === "/" ? "/index.html" : req.url.pathname;
	if (isStaticResource(req.url.pathname)){
		var resourcePath = path.join(__dirname, req.url.pathname);
		fs.exists(resourcePath,function(exists){
			if (exists){
				var stream = fs.createReadStream(resourcePath, {encoding : "utf8"}).pipe(res);
				stream.on("end", function(){
					next();
				})
			} else {
				res.statusCode = 404;
				res.end();
			}
		});
	} else {
		next();
	}
}

module.exports = serveResource;