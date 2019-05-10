var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var moment = require("moment");
var chalk = require("chalk");
var validator = require("validator");
var fs = require("fs");
var dotenv = require("dotenv");
var _ = require("underscore");
var mongoose = require("mongoose");
var Food = require("./model/Food");
var Review = require("./model/Review");
var BBT = require("./model/BBT");

var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

dotenv.config();

//CONNECT TO MONGODB
//console.log(process.env.MONGODB);
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true});
mongoose.connection.on("error", function() {
  console.log(
    "MongoDB Connection Error. Please make sure that MongoDB is running."
  );
  process.exit(1);
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use("/public", express.static("public"));

/* get requests */
app.get("/", function(req, res) {
  var randomBBT;
  BBT.find({}, function (err, bbt) {
    if (err) throw err;
    if (bbt.length == 0) {
      randomBBT = {
        name: "Random",
        type: "Milk Tea",
        toppings: "Red Bean",
        ice: 0,
        sugar: 100,
        id: 1
      }
    } else {
      var min = 0;
      var max = bbt.length;
      var num = Math.floor(Math.random() * (+max - +min)) + +min;
      randomBBT = bbt[num];
    }
    res.render("home", randomBBT);
  });
});

app.get("/drinks", function(req, res) {
  BBT.find({}, function(err, drinks) {
    if (err) throw err;
    res.render("drinks", { data: drinks });
  });
});

app.get("/food", function(req, res) {
  Food.find({}, function(err, food) {
    if (err) throw err;
    res.render("food", { data: food });
  });
});

app.get("/reviews", function(req, res) {
  Review.find({}, function(err, review) {
    if (err) throw err;
    res.render("reviews", { data: review });
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/drinkform", function(req, res) {
  var type = ["Tea", "Milk Tea", "Smoothie"];
  var topping = ["Bubbles", "Jelly", "Red Bean"];
  var flavor = ["Passion Fruit", "Taro", "Black Tea", "Green Tea"];
  res.render("drink_form", { types: type, toppings: topping, flavors: flavor });
});

app.get("/foodform", function(req, res) {
  res.render("food_form", {
    types: ["Appetizer", "Noodle Bowl", "Rice Bowl", "Dessert"]
  });
});

/* delete requests */
app.delete("/drinks/:id", function(req, res) {
  BBT.remove({ id: { $eq: req.params.id } }, function(err, bbt) {
    if (err) throw err;
    BBT.find({}, function(err, drinks) {
      if (err) throw err;
      res.redirect("/drinks");
    });
  });
});

app.delete("/reviews/:id", function(req, res) {
  Review.remove({ id: { $eq: req.params.id } }, function(err, review) {
    if (err) throw err;
    return res.redirect("/reviews");
  });
});
app.delete("/food/:id", function(req, res) {
  Food.remove({ id: { $eq: req.params.id } }, function(err, food) {
    if (err) throw err;
    return res.redirect("/food");
  });
});

/* post requests */
app.post("/food", function(req, res) {
  Food.find({}, function(err, food) {
    if (err) throw err;
    if (!validator.isURL(req.body.pic)) {
      req.body.pic =
        "http://jumbojumbocafe.com/wp-content/uploads/2018/01/logo300.png";
    }
    if (food.length == 0) {
      max = 0
    } else {
      max = food[food.length - 1].id;
    }

    var food = new Food({
      ingredients: req.body.ingredients,
      name: req.body.name,
      picture: req.body.pic,
      price: req.body.price,
      type: req.body.type,
      id: max + 1
    });
    // Save food to database
    food.save(function(err) {
      if (err) throw err;
      res.redirect('/food')
    });
  });
});

app.post("/reviews", function(req, res) {
  var max = 0;
  Review.find({}, function(err, reviews) {
    if (err) throw err;
    if (reviews.length == 0) {
      max = 0
    } else {
      max = reviews[reviews.length - 1].id;
    }
    var review = new Review({
      name: req.body.name,
      comment: req.body.comment,
      rating: req.body.rating,
      date: moment(req.body.date, "MM/DD/YYYY").format("dddd, MMMM Do YYYY"),
      id: max + 1
    });

    review.save(function(err) {
      if (err) throw err;
        io.emit("New Review!", review);
    });
  });
});

/*post request from form */
app.post("/drinks", function(req, res) {
  var max = 0;
  BBT.find({}, function(err, drinks) {
    if (err) throw err;
    if (drinks.length == 0) {
      max = 0
    } else {
      max = drinks[drinks.length - 1].id;
    }
    var drinks = new BBT({
      name: req.body.name,
      type: req.body.type,
      toppings: req.body.toppings,
      ice: (req.body.ice)*25,
      sugar: req.body.sugar*25,
      flavor: req.body.flavor,
      id: max + 1
    });

    drinks.save(function(err) {
      if (err) throw err;
      res.redirect('/drinks')
    });
  });
});

io.on("connection", function(socket) {
  console.log("New connection.");
});

http.listen(process.env.PORT || 3000, function() {
  console.log("Listening!");
});
