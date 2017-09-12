var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('news', ['news']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/newslist', function(req, res){
  console.log(req.body);
  db.news.find(function(err, docs){
    console.log(docs);
    res.json(docs);
  });
});

app.post('/newslist', function(req, res){
  console.log(req.body);
  db.news.insert(req.body, function(err, doc){
    res.json(doc);
  });
});

app.delete('/newslist/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.news.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  })
});

app.get('/newslist/:id', function(req, res){
  var id = req.params.id;
  db.news.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  });
});

app.put('/newslist/:id', function(req, res){
  var id = req.params.id;
  db.news.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function(err, doc){
      res.json(doc);
    });
});

app.get('/search/:keyword', function(req, res){
  var key = req.params.keyword;
  db.news.find({$text: {$search: key}}, function(err, doc){
    res.json(doc);
  });
});

app.listen(3000);
console.log("Server running");
