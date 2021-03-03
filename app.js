const express = require("express");
const app = express();
const mongoose = require('mongoose');

// let items = ["Buy Food", "Cook Food", "Eat Food"];
// let workItems = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs"); // setting express view engine to use ejs

// setting up database
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to database'));
db.once('open', () => {
    console.log("We are connected to mongodb @localhost:27017");
});

// create schema to for Item
const itemSchema = {
    name: {
        type: String,
        required: [true, "An item is required to store in ToDo list."]
    }
};

// create the model for an Item based on itemSchema.
const Item = mongoose.model("Item", itemSchema);

app.get("/", (req, res) => {
    res.render("list", { listTitle: "Today", newListItems: items });
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