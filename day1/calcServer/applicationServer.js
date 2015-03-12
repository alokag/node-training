var http = require("http"),

    staticDataProcessor = require("./StaticDataProcessor.js"),
    calcProcessor = require("./CalcProcessor.js");


var server = http.createServer(function (request, response) {

    if (urlObj.pathname.trim() == "/calc") {

        calcProcessor.process(request, response);

    } else {

        staticDataProcessor.process(request, response);


    }

})
server.listen(9090);
console.log("listening on port 9090")