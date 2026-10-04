const express = require("express");
const app =  express();
const mongoose = require("mongoose");
const Listing  = require("./model/listing.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });


async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
    res.send("root is working ...");
});

app.get("/listings",async (req, res) => {
    const allListing = await Listing.find({});
        res.render("./listings/index.ejs", {allListing});
    });


// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the Beach",
//         price:1200,
//         location:"Goa",
//         country:"India"
//     });

//     await sampleListing.save()
//     console.log("Sample Was Saved..");
//     res.send("SuccessFull testing...");

// });


app.listen(8080, () => {
    console.log("App is listening on port 8080");
});

