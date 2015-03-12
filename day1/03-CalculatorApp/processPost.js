var http = require("http"),
    url = require("url"),
    path = require("path"),
    qs = require("querystring"),
    resourceProcessor = require("./staticResourceProcessor"),
    calculatorProcessor = require("./calculatorProcessor");

String.prototype.toNumber = function () {
    return parseInt(this, 10);
};

var server = http.createServer(function (req, res) {

    //set index.html as default
    req.url = url.parse(req.url, true);
    req.url.pathname = req.url.pathname === "/" ? "/index.html" : req.url.pathname;
    if (resourceProcessor.isStatic(req.url.pathname)) {
        resourceProcessor.serve(req, res);
    } else if (req.url.pathname === "/calculator") {
        calculatorProcessor.process(req, res);
    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen(9090);
console.log("Server listening on port 9090");