const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require('path');
const bodyParser = require("body-parser");

const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

app.use(express.static('assets'));

// log requrest
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// parse requrest
app.use(bodyParser.urlencoded({extended:true}))

// set view engine
app.set("view engine", "ejs")

// load assets
// app.set("views",path.resolve(__dirname, "views/ejs"))
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))


// load routes
app.use('/', require('./server/routes/router'))


// load port
app.listen(PORT, () => {
  console.log(`Service is runnig on http://localhost:${PORT}}`);
});
