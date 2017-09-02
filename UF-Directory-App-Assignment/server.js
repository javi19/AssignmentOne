var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 8080;

/* Global variables */
var listingData;
var server;

function send404Response(response)
{
    response.writeHead(404, {"Context-Type": "text/plain"});
    response.write("Bad gateway error");
}

var requestHandler = function (request, response) {
    var parsedUrl = url.parse(request.url);
    if (request.method === "GET" && parsedUrl.path === "/listings") {
        response.writeHead(202, {"Context-Type": "text/plain"});
        response.write(listingData);
    } else {
        send404Response(response);
    }
    response.end();
};

fs.readFile("listings.json", "utf8", function (err, data) {

    listingData = data;
    beginServer();
});

function beginServer(){
    server = http.createServer(requestHandler);
    server.listen(port, function() {
        console.log("Server listening on: http://localhost:" + port);
    });
}