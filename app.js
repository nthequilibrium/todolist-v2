const express = require("express");
const app = express();

app.set("view engine", "ejs"); // setting express view engine to use ejs

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(3000, () => {
    console.log("Server is running @ port 3000");
});