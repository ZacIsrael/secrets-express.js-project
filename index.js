//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

// import the express module
import express from "express";

import { dirname } from "path";
import { fileURLToPath } from "url";

// module that is used to parse the body of an HTML form
import bodyParser from "body-parser";

// gets the name of the directory that this file is in.
// This needs to be done programatically like this because
// in a real application, you won't be on your local machine.
const __dirname = dirname(fileURLToPath(import.meta.url));

// creates an application
const app = express();

const secretPassword = "ILoveProgramming";

// port: the location of the server where it'll be
// listening for requests from the client side
const port = 3000;

// Registers middleware that parses URL-encoded data from incoming
// HTTP requests, making it available on the request's body (req.body).
app.use(
  bodyParser.urlencoded({
    // extended: true option tells the parser to use the qs library for parsing,
    // which allows for rich objects and nested arrays to be encoded into the
    // URL-encoded format. (Let's the application application handle and access
    // form data (including nested data) submitted through HTTP requests.)
    extended: true,
  })
);

// custom logger that is an anonymous function
// let logger = (req, res, next) => {
//   // req.method = the method (GET, POST, PUT, etc.) of the request
//   console.log("Request Method = ", req.method);
//   // req.body = the request's body
//   console.log("Request Body = ", req.body);
//   // req.url = the end point of this request
//   console.log("Request URL: ", req.url);
//   // moves on to the next middleware function in the chain; prevents the app from hanging
//   next();
// };

// app.use(logger);

// default endpoint
app.get("/", (req, res) => {
  // dispaly the following index.html file
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  let reqPassword = req.body.password;
  console.log("req.body = ", req.body);

  if (reqPassword === secretPassword) {
    res.sendFile(__dirname + "/public/secret.html");
    // res.sendStatus(200);
  } else {
    // wrong password
    res.sendFile(__dirname + "/public/index.html");
    // res.sendStatus(300);
  }
});

// port: the location of the server where it'll be
// listening for requests from the client side.
app.listen(port, () => {
  // callback function that is triggered when the server is set up.
  console.log(`Server running on port ${port}.`);
});
