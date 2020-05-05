var Datastore = require('nedb');
var db = new Datastore({filename: "data.db", autoload: true});

var express = require('express');
var app = express();
app.use(express.static('publics'));
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

//var XMLHttpRequest = require('xhr2');
//var reqwest = require('reqwest');

/*

app.post('/storage', function(req, res) {
    var datatostore = {
        id_data:idd,
        scientific: sc_name,
        common: com_name
    };        

    db.insert(datatostore, function(err, newDocs){
        console.log('err:' + err);
        console.log('newDocs:' + newDocs);
    });
});

app.get('/display', function(req,res){
    db.find({}).sort({ timestamp: 1 }).exec(function (err, docs) {
        //db.find({}, function(err, docs) {
        console.log(docs);
        res.send(docs);
    });
});

app.get('/print', function(req,res){
    var id = req.query.id;
    db.find({_id: id}, function(err, docs) {
        console.log(docs);
        
        var datatopass = {data: docs};
        res.render("test.html",datatopass);
    });  
});

*/

app.get('/search', function(req,res){
    //req.query.search-ani;
    res.redirect('test2.html?ani='+req.query.ani);
});

app.get('/', function (req, res) {
    var fileToSend = "test.html";
    res.sendfile(fileToSend, {root: './publics'}); 
});

app.get('/homepage', function (req, res) {
    var fileToSend = "Endangered_Home.html";
    res.sendfile(fileToSend, {root: './publics'}); 
});

    
app.get('/species', function (req, res) {
    var fileToSend = "Endangered_Species.html";
    res.sendfile(fileToSend, {root: './publics'}); 
});
    
app.get('/habitat', function (req, res) {
    var fileToSend = "Endangered_Habitat.html";
    res.sendfile(fileToSend, {root: './publics'}); 
});

app.listen(80, function () {
    console.log('Example app listening on port 80!');
});
  