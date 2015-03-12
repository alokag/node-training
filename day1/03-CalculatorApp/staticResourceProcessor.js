var fs = require("fs"),
	url = require("url"),
	path = require("path");

var staticResourceExtns = [".html", ".css", ".js", ".jpg", ".png", ".ico"];

function isStaticResource(resourceName){
	return staticResourceExtns.indexOf(path.extname(resourceName)) !== -1;
}

function serveResource(req,res){
	
	var resourcePath = path.join(__dirname, req.url.pathname);
	fs.exists(resourcePath,function(exists){
		if (exists){
			fs.createReadStream(resourcePath, {encoding : "utf8"}).pipe(res);
		} else {
			res.statusCode = 404;
			res.end();
		}
	});
}

module.exports = {
	isStatic : isStaticResource,
	serve : serveResource
};