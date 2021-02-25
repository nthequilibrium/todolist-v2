const express = require("express");
const app = express();

var items = ["Buy Food", "Cook Food", "Eat Food"];

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs"); // setting express view engine to use ejs

app.get("/", (req, res) => {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("EN-IN", options);

    res.render("list", { kindOfDay: day, newListItems: items });
});

app.post("/", (req, res) => {
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running @ port 3000");
});