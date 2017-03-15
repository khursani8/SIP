var http = require("http");
express = require('express')
var os = require('os')
var json2csv = require('json2csv');
var fs = require('fs');
var fields = ['email', 'username', 'agency', 'country', 'status'];

finduser = require("./js/new1").runPsScript;
exportit = require("./js/spa3").runPsScript;
exportCsv = require("./js/spa3").runPsScript;

var path = require('path');
var sleep = require('system-sleep');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use(express.static('.'))

var SamlStrategy = require('passport-saml').Strategy;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/login.html'));
});

app.get('/finduser', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/html.html'));
});

app.get('/support', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/login.html'));
});

app.get('/attributes', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/attributes.html'));
});

app.post('/exportcsv', function(req, res) {
    // var email = req.query.Email;
    // var usernames = req.query.Usernames;
    // var agency = req.query.Agency;
    // var country = req.query.Country;
    // var status = req.query.Status;
    // res.sendFile(path.join(__dirname + '/html/index1.html'));
    var csv = json2csv({ data: req.body, fields: fields });

    path1 = 'file.csv'

    if (fs.existsSync(path1)) {
        fs.appendFile(path1, csv.split('\n')[1], function(err) {
            if (err) throw err;
            console.log('file saved');
        });
    } else {
        fs.appendFile('file.csv', csv, function(err) {
            if (err) throw err;
            console.log('file saved');

        });

    }
    fs.appendFile('file.csv', '\n', function(err) {
        if (err) throw err;
        console.log('add space');
    });




    res.json((req.body));

    res.end();

});



app.get('/download', function(req, res) {
    exportit(res, ".\\powershell.ps1");
    sleep(10000);
    res.redirect('/finduser');
});


app.listen(8000, function() {
    console.log('Example app listening on port 8000!')
})