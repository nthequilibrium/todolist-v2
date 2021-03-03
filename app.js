const express = require("express");
const app = express();
const mongoose = require('mongoose');
const date = require(__dirname + "/date.js");

// let items = ["Buy Food", "Cook Food", "Eat Food"];
// let workItems = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs"); // setting express view engine to use ejs

// setting up database
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.get("/", (req, res) => {
    let day = date();
    res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", (req, res) => {
    let item = req.body.newItem;
    if (req.body.button === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", function (req, res) {
    res.render("about");
})

app.listen(3000, () => {
    console.log("Server is running @ port 3000");
});