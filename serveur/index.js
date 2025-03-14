var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Variables globales
let state = 0;
var allMsgs = [
    {"msg": "Hello World", "pseudo" : "user1", "date": new Date(2023, 0, 15, 10, 30)},
    {"msg": "foobar", "pseudo" : "user2", "date": new Date(2023, 0, 16, 11, 45)},
    {"msg": "CentraleSupelec Forever", "pseudo" : "user3", "date": new Date(2023, 0, 17, 9, 20)}
];



// Routes 2.1
app.get("/", function (req, res) {
    res.send("Hello")
})

app.get('/test/*', function (req, res) {
    // Premier test de réponse
    const first_response = {
        "json": {
            "a": 1,
            "b": 2
        },
        "array": [
            "Hello",
            "World"
        ],
        "integer": 42
    };

    // Deuxième test de récupération depuis l'URL
    url = req.url;
    message = url.split("/")[2];
    res.json({"msg" : message});
});

// Routes 2.3
app.get('/cpt/query', function (req, res) {
    res.json({"cpt" : state});
});

app.get('/cpt/inc*', function (req, res) {
    if (req.query.v === undefined) {
        state += 1;
        res.json({"code" : 0});
    }
    else if (v.match(/^[0-9]+$/)) {
        state += parseInt(v);
        res.json({"code" : 0});
    } 
    else {
        res.json({"code" : -1});$
    }
});

// Routes 2.4
app.get('/msg/post*', function (req, res) {
    message = unescape(req.query.msg);
    pseudo = unescape(req.query.pseudo);
    date = new Date();
    index = allMsgs.push({"msg": message, "pseudo": pseudo, "date": date});
    res.json(index)
});

app.get('/msg/get/*', function (req, res) {
    number = req.url.split("/")[3];
    if (number.match(/^[0-9]+$/) && parseInt(number) < allMsgs.length && parseInt(number) >= 0) {
        res.json({"code": 1, "msg" : allMsgs[parseInt(number)]});
    } else {
        res.json({"code" : 0});
    }
});

app.get('/msg/getAll', function (req, res) {
    res.json(allMsgs);
});

app.get('/msg/nber', function (req, res) {
    res.json(allMsgs.length);
});

app.get('/msg/del/*', function (req, res) {
    number = req.url.split("/")[3];
    if (number.match(/^[0-9]+$/) && parseInt(number) < allMsgs.length && parseInt(number) >= 0) {
        allMsgs.pop(parseInt(number));
        res.json({"code": 1});
    } else {
        res.json({"code" : 0});
    }
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");