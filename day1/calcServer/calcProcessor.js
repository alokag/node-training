var urlParser = require("url"),
    calc = require("./calculator.js");

CalcProcessor = {
        process: function (request, response) {
            var url = request.url;
            var urlObj = urlParser.parse(url, true);

            // console.log(urlObj);

            if (urlObj.pathname.trim() == "/calc") {

                var op = urlObj.query.op;
                var n1 = parseFloat(urlObj.query.n1);
                var n2 = parseFloat(urlObj.query.n2);


                var result = calc[op].call(this, n1, n2);
                response.write('result' + result);
                response.end();

            }
        }

            module.exports = CalcProcessor;