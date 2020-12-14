// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Star Wars Characters (DATA)
// =============================================================
var notes = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});


// Displays all characters
app.get("/api/notes",function(req, res) {
  fs.readFile("./db/db.json",function(err,data){
    if(err) throw err;
    var content = JSON.parse(data);
    return res.json(content);
 //  console.log(content);
  });
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Displays a single character, or returns false


// Create New Characters - takes in JSON input
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;
  var lastID;
    
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  //newNote.id = id;

  console.log(newNote);

   fs.readFile("./db/db.json",function(err,data){
     if(err) throw err;
     var notes = JSON.parse(data);
     
     console.log(lastID);

     
      lastID = notes[notes.length-1].id;
      id = lastID + 1;  
     
     
     
     newNote.id = id;

     notes.push(newNote);
     console.log(notes);
     

    fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
      if (err) return console.log(err);
    });
    
   });

  res.json(newNote);
});


app.delete("/api/notes/:id", function(req, res) {
  var chosen = req.params.id;

  fs.readFile("./db/db.json",function(err,data){
    if(err) throw err;
    var notes = JSON.parse(data);
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == chosen) {
          //console.log(notes[i]);
          console.log(notes);
           notes.splice(i, 1);
           console.log(notes);
           fs.writeFile("./db/db.json", JSON.stringify(notes),function(err,data){
              if(err) return console.log(err);
           });
        }
      }
  });

  return res.json(false);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
