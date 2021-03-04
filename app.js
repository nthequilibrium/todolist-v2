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

// dummy items
const milk = new Item ({ name: "Buy Milk"});
const bills = new Item ({ name: "Pay bills"});
const mail = new Item ({ name: "Collect Mail"});

const dummyItems = [milk, bills, mail];

const listSchema = {
    name: String,
    items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

// insert the items array into database

app.get("/", (req, res) => {
    Item.find({}, function (err, items) {
        if (err) {
            console.error.bind(console, "Error reading database", err);
        } else {
            if (items.length === 0) {
                Item.insertMany(dummyItems, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Dummy items inserted into document");
                    }
                    items = dummyItems;
                });
            }
            res.render("list", { listTitle: "Today", newListItems: items});
        }
    });
});

app.get("/:customListName", function (req, res) {
    const customListName = req.params.customListName;

    List.findOne({name: customListName}, function (err, foundList) {
        if (!err) {
            if (!foundList) {
                // Create the list
                const list = new List({
                    name: customListName, 
                    items: dummyItems
                });
            
                list.save();
                res.redirect("/" + customListName);
            } else {
                // Show existing list
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
            }
        }
    })

});

app.get("/favicon.ico", (req, res) => {
    res.status(204);
})

app.post("/", (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;
    if (itemName === "") {
        res.redirect("/");
    }
    const item = new Item({ name: itemName});

    if (listName === "Today") {
        item.save(err => {
            if (err) {
                console.error.bind(console, err);
            } else {
                res.redirect("/");
            }
        });
    } else {
        List.findOne({name: listName}, (err, foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        })
    }
});

app.post("/work", (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", function (req, res) {
    res.render("about");
})

app.post("/delete", (req, res) => {
    const checkedItem = req.body.itemCheck;

    // deleting item document based on item-id
    Item.findByIdAndDelete(checkedItem, (err, doc) => {
        // console.log(doc);
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running @ port 3000");
});