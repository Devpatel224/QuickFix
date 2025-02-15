const express = require("express");
const app = express();
const cors = require('cors');



app.get("/", (req, res) => {
  res.send("Hello World");
})


app.listen(3000)