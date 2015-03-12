var http = require("http"),
    urlParser = require("url"),
    calc = require("./calculator.js"),
     fs  = require("fs"),
    path = require("path");

var StaticDataProcessor = {
    
    process: function(request, response){
        
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

        });
    }

}

module.exports = StaticDataProcessor;

