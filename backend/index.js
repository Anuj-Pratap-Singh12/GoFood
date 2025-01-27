const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

app.use(cors(
  {
    origin : ["https://deploy-mern-lwhq.vercel.app"],
    methods : ["POST","GET"] ,
    credentials : true ,
  } 
))
               
const mongodb = require("./db"); // Ensure db.js is imported to establish the database connection
mongodb();


app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
