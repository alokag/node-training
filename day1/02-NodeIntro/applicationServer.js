var http = require("http"),
    urlParser = require("url"),
    calc = require("./calculator.js"),
     fs  = require("fs"),
    path = require("path");

var server = http.createServer(function(request, response){
    
    var url = request.url;
    
    var urlObj = urlParser.parse(url, true);
    
   // console.log(urlObj);
    
    if(urlObj.pathname.trim() =="/calc"){

        var op = urlObj.query.op;
        var n1 = parseFloat(urlObj.query.n1);
        var n2  = parseFloat(urlObj.query.n2);


        var result = calc[op].call(this, n1,n2);
        response.write('result' + result);
        response.end();

    }else{    
    
        var resoursePath = path.join(__dirname,request.url);
    
        fs.exists(resoursePath, function(exists){
            if(exists){
                var stream = fs.createReadStream(resoursePath,{encoding:"UTF8"});
                stream.on("data", function(dataChunk){
                    response.write(dataChunk);
                });
               stream.on('end', function() {
                  response.write('<br>=====================');
                   response.end();
                });            
            }else{
                response.statusCode=404;
                response.end();
            }

        })        

        
    }

})
server.listen(9090);
console.log("listening on port 9090")

