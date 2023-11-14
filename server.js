// Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { APIKey, PORT } = require("./Key.json");

// Initilizing HTML parser
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// Setting up schemas
const eventSchema = {
  name: String,
  date: Date,
  description: String
}
const Event = mongoose.model('events', eventSchema);

// Connecting to mongo
const dbURL = `mongodb+srv://developer:${APIKey}@cluster0.4ztfnxn.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURL);

app.get('/', async (req, res) => {
   const events = await Event.find();
   res.render("index.ejs", {events: events});
})

// Running the server
app.listen(PORT, ()=>{
    console.log("Server listening on port "+PORT);
    console.log(`http://localhost:${PORT}`)
})