const express = require("express");
const app = express();

app.set("view engine", "ejs"); // setting express view engine to use ejs

app.get("/", (req, res) => {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("EN-IN", options);

    res.render("list", { kindOfDay: day });
});

app.listen(3000, () => {
    console.log("Server is running @ port 3000");
});