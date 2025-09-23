// const express = require('express');

// const app = express()
// const PORT = 8000

// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

// app.get('/about', (req, res) => {
//   res.send('About route 🎉 ')
// })

// app.listen(PORT, () => {
//   console.log(`✅ Server is running on port ${PORT}`);
// })

const express = require("express");
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
//provide to all files, if not use only dy befault main access
const configEnv = require("dotenv").config();
// Helmet helps secure Express apps by setting HTTP response headers. by default not header specify by express for http
const helmet = require("helmet");
// HTTP request logger middleware for node.js
const morgan = require("morgan");
const connectToMongoDB = require("./config/mongoose");
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cors = require("cors"); // CORS (Cross-Origin Resource Sharing):Since your frontend and backend are on different ports, you might encounter CORS issues. To solve this during development, you can use the cors middleware in your Express backend:
const app = express();
const port = process.env?.PORT;

//add db
let isConnected = false; //track connection
// middleware to check and connect db before each req
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectToMongoDB();
    isConnected = true;
  }
  next();
});

//cors
app.use(
  // cors({
  //   origin: "http://localhost:3000", //frontend url, for local test
  //   // methods: ["GET", "POST", "PUT", "DELETE"],
  //   // credentials: true, //access-control-allow-credentials:true
  // })
  cors()
);
// app.use(express.urlencoded());//only work for url, x-www-form-urlencoded

app.use(express.json()); //to parse req, only application/json content-type work, else use urlencoded()
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Hello World! server is up");
});

app.use("/", require("./routers"));

// app.listen(port, (error) => {
//   if (error) console.log(error);
//   console.log("Server running on port 8000");
// });

// vercel server less so no need to listen
module.exports = app;
