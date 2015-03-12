var http = require("http"),
    fs  = require("fs"),
    path = require("path");
var server = http.createServer(function(request, response){
    //console.log("a new conection is stablished" + request.url);
    response.write("<h1>Welcome to Nodejs</h1>");
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
    

})
server.listen(9090);
console.log("listening on port 9090")

