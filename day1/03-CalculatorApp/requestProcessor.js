var url = require("url"),
	qs = require("querystring");



function process(req,res, next){
    
    console.log("reqprocesser called with next==", next);
	
    if (req.method =="GET"){
       // var data = req.url.query;
        if(typeof(next) =="function") next();
    }else{
        if (req.method.toLowerCase() === "post") {
            var data = '';
            req.on("data", function (dataChunk) {
                data += dataChunk;
            });
            req.on("end", function () {
                console.log("POST req end next>>", next);
                req.url.query = qs.parse(data);
                //new step added
                if(typeof(next) =="function") next();
            });
        }    
    } 
    
}

module.exports = {
    process: process
}