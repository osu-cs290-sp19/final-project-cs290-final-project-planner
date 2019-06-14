var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST || "classmongo.engr.oregonstate.edu";
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER || "cs290_bhallaa";
var mongoPassword = process.env.MONGO_PASSWORD || "aBhalla_446";
var mongoDBName = process.env.MONGO_DB_NAME || "cs290_bhallaa";

var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;
var db = null;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function(req, res){
    let listCollection = db.collection("todo");
    listCollection.find({}).toArray(function(err, listData){
        if (err) {
            res.status(500).send("Server Error!");
        }
        else {
            res.status(200).render('elementGrid', {listDisplay: listData});
        }
    });
});

app.get('404', function (req, res) {
  res.status(404).render('404');
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.post("/addList", function(req, res, next) {
    if (req.body) {
        let listCollection = db.collection("todo");
        listCollection.find({}).toArray(function(err, listData){
            if (err) {
                res.status(500).send("Server Error!");
            }

            let newList = {
                listName: req.body.listName,
                listItems: req.body.listItems
            };

            listCollection.insertOne(newList, function(err, listData){
                if (err) {
                    res.status(500).send("Error when inserting into database!");
                }
                else {
                    res.status(200).send("Success!");
                }
            })
        });
    }
    else {
        next();
    }
})

// app.post("/:listName/addListItem", function(req, res, next) {
//     if (req.body) {
//         let listCollection = db.collection("todo");
//         listCollection.find({}).toArray(function(err, listData){
//             if (err) {
//                 res.status(500).send("Database Error!");
//             }
//
//             let listCollection = db.collection("todo");
//             // listCollection.find({ name: req.params.listName });
//             listCollection.updateOne(
//                 { listName: req.params.listName },
//                 { $set: {
//                     listName: req.body.listName,
//                     listColor: req.body.listColor,
//                     listItems: req.body.listItems
//                 }},
//                 function (err, results) {
//                     if (err) {
//                         console.log(err);
//                     }
//                 }
//             );
//         });
//     }
//     else {
//         next();
//     }
// })

// app.post("/editList/:listName", function(req, res, next) {
//     if (req.body) {
//         let listCollection = db.collection("todo");
//         listCollection.find({}).toArray(function(err, listData){
//             if (err) {
//                 res.status(500).send("Database Error!");
//             }
//
//             let listCollection = db.collection("todo");
//             // listCollection.find({ name: req.params.listName });
//             listCollection.updateOne(
//                 { listName: req.params.listName },
//                 { $set: {
//                     listName: req.body.listName,
//                     listColor: req.body.listColor,
//                     listItems: req.body.listItems
//                 }},
//                 function (err, results) {
//                     if (err) {
//                         console.log(err);
//                     }
//                 }
//             );
//         });
//     }
//     else {
//         next();
//     }
// })

app.post('*', function(req, res) {
    res.status(404).send("Attempt to post to unknown path!");
});

MongoClient.connect(mongoUrl, function (err, client) {
  if (err) {
    throw err;
  }
  db = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
