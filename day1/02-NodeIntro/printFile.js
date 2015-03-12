
var fs  = require("fs");
//Sync way
//var fileContent = fs.readFileSync("test.txt",{encoding:"UTF8"});
//console.log(fileContent);

//aSync way
var fileContent = fs.readFileSync("test.txt",{encoding:"UTF8"}, function(err, fileContent){
    console.log(fileContent);
});

////More efficient way
var stream = fs.createReadStream("test.txt",{encoding:"UTF8"});

stream.on("data", function(dataChunk){

	console.log(dataChunk)

})

stream.on('end', function() {
  console.log('=====================');
});
////////
