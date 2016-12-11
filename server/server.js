var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var url = require('url');
var fs = require('fs');
var axios = require('axios');
var xml2js = require('xml2js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '../client/')));

console.log("launch shafferoogle server - listening on port 8080");

app.get('/fetchAlbums', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  console.log("fetchAlbums invoked");

  var getAlbumsUrl = "http://picasaweb.google.com/data/feed/api/user/shaffer.family";
  axios.get(getAlbumsUrl)
    .then(function (albumsResponse) {
      console.log(albumsResponse);
      console.log("success");

      var xml = albumsResponse.data;

      var parseString = require('xml2js').parseString;
      parseString(xml, function (err, result) {
        console.dir(result);
        // res.send(result);
        res.status(200).send(result);
      });
    })
    .catch(function (albumsError) {
      console.log(albumsError);
      res.send("poo");
    });
});


// in spite of the documentation, default does not work (at least in this simple case)
// var getAlbumsUrl = "http://picasaweb.google.com/data/feed/api/user/default";
// var getAlbumsUrl = "http://picasaweb.google.com/data/feed/api/user/shaffer.family";
// axios.get(getAlbumsUrl)
//   .then(function (albumsResponse) {
//     console.log(albumsResponse);
//     console.log("success");
//
//     var xml = albumsResponse.data;
//
//     var parseString = require('xml2js').parseString;
//     parseString(xml, function (err, result) {
//       console.dir(result);
//     });
//   })
//   .catch(function (albumsError) {
//     console.log(albumsError);
//   });

// var getAlbumUrl = "http://picasaweb.google.com/data/feed/api/user/shaffer.family/albumid/6157781148956998593";
// axios.get(getAlbumUrl)
//   .then(function (albumResponse) {
//     console.log(albumResponse);
//     console.log("success");
//
//     var xml = albumResponse.data;
//
//     var parseString = require('xml2js').parseString;
//     parseString(xml, function (err, result) {
//       console.dir(result);
//     });
//   })
//   .catch(function (albumError) {
//     console.log(albumError);
//   });

var port = process.env.PORT || 8080;
app.listen(port);
