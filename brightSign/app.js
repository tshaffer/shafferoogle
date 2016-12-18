var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var url = require('url');
var fs = require('fs');
var axios = require('axios');
var xml2js = require('xml2js');

var app = express();

console.log("app.js loaded");

function launchApp()
{
  console.log("launchApp invoked");

  // Load the http module to create an http server.
  var http = require('http');

  // Configure our HTTP server to respond with Hello World to all requests.
  var server = http.createServer(function (request, response) {
    var device_info = new BSDeviceInfo();
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Device Information:\n" + device_info.model + "\n" + device_info.bootVersion + "\n");
    var ip = request.connection.remoteAddress;
    document.getElementById("Ip").innerHTML+="Server responded to: "+ ip + "<br>";
    console.log("Server responded to request from " + ip);
  });

  // Listen on port 8000, IP defaults to 127.0.0.1
  server.listen(8000);

  // Display it on brightsign browser
  var os = require('os');
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  var message = "Server running at: " + addresses[0] + ":8000<br>";
  document.getElementById("Ip").innerHTML+= message;

  // Print message on console
  console.log(message);

}

console.log("invoke launchApp");
launchApp();
