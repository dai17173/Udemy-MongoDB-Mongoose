const mongoose = require('mongoose');

//Create db
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

//InsertDocuments 1
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const pineapple = new Fruit({
  name:"Pineapple",
  score: 9,
  review: "Great fruit."
});

pineapple.save();


//InsertDocuments 2
const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
  name: "John",
  age: 37,
  favouriteFruit: pineapple
});

person.save();


//starting the process of documents
Person.deleteMany({name: "John"}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully deleted all the documents.");
  }
});


Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  } else {
    //console.log(fruits);

    //Close db
    setTimeout(function() { mongoose.connection.close();}, 1000);

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});


Fruit.updateOne({_id: "5bc04423gs58tngfgst43"}, {name: "Peach"}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated the document.");
  }
});


Fruit.deleteOne({name: "Peach"}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully deleted the document.");
  }
});


// if i want to insert many fruits faster
const kiwi = new Fruit ({
  name: "Kiwi",
  score: 10,
  review: "The best fruit!"
});

const orange = new Fruit ({
  name: "Orange",
  score: 4,
  review: "Too sour for me"
});

const banana = new Fruit ({
  name: "Banana",
  score: 3,
  review: "Weird texture"
});

Fruit.insertMany([kiwi, orange, banana], function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully saved all the fruits to fruitsDB");
  }
});




// ---------------------------- MongoDB ----------------------------


// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
//
// // Connection URL
// const url = 'mongodb://localhost:27017';
//
// // Database Name
// const dbName = 'fruitsDB';
//
// // Create a new MongoClient
// const client = new MongoClient(url, {useUnifiedTopology: true});
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   //insertDocuments(db, function() {
//     findDocuments(db, function() {
//       client.close();
//     });
//   //});
// });


// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Insert some documents
//   collection.insertMany([
//     {
//       name : "Apple",
//       score : 8,
//       review : "Great fruit"
//     },
//     {
//       name : "Orange",
//       score : 6,
//       review : "Kinda sour"
//     },
//     {
//       name : "Banana",
//       score : 9,
//       review : "Great stuff!"
//     }
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// };


// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Find some documents
//   collection.find({}).toArray(function(err, fruits) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(fruits)
//     callback(fruits);
//   });
// };
