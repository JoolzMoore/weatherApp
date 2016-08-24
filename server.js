var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var path = require('path');
var bodyParser = require ('body-parser');
var hbs = require ('express-handlebars');

app.engine('hbs', hbs ({extname:'hbs', defaultLayout:'layout', layoutDir: __dirname + '/views/layout.hbs'}));
app.set('view engine', 'handlebars');
app.set ('views', path.join(__dirname, "views"));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname,"views/index.html"))
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use('/', public, express.static('public'));
app.get('/scrape', function(req, res){

  url = 'http://www.metvuw.com/forecast/forecast1.php?type=rain&region=nz&noofdays=10'
  host = 'http://www.metvuw.com/forecast/'

  request(url, function(error, response, html){
    if(!error){
      let $ = cheerio.load(html)
      var json = ''

      let images = $('img').each(function(i, elem) {
        json = path.join(host, $(this).attr('src'))
      })
      //app.use ('/', routes);
    }

    // Parameter 1 :  output.json - this is what the created filename will be called
    // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
    // Parameter 3 :  callback function - a callback function to let us know the status of our function

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
        console.log('File successfully written! - Check your project directory for the output.json file');
    })

    //  send out a message to the browser reminding you that this app does not have a UI.
    res.send(json)
    }) ;
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
