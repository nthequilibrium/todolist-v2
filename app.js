const express = require("express");
const app = express();

app.set("view engine", "ejs"); // setting express view engine to use ejs

app.get("/", (req, res) => {
    let today = new Date();
    let daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentDay = today.getDay();
    let day = daysOfTheWeek[currentDay];

    // if (currentDay === 6 || currentDay === 0) {
    //     day = "Weekend";
    // } else {
    //     day = "Weekday";
    // }

    res.render("list", { kindOfDay: day });
});

app.listen(3000, () => {
    console.log("Server is running @ port 3000");
});