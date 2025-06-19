const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const { connectdb, Connectdb } = require("./Config/db");
const cors = require("cors");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const HistoryRouter = require("./Routes/HistoryRoute");
const authRouter = require("./Routes/auth");
dotenv.config({ path: "./Config/config.env" });
const app = express();
app.use(cors());
app.use(bodyparser.json({ limit: "30mb" }));
app.use(morgan("dev"));

Connectdb();

app.get("/",(req,res)=>{
  try {
    res.send("Hello")
  } catch (error) {
    console.log(error);
  }
})
app.use("/balaji", HistoryRouter);
app.use("/auth", authRouter);

app.listen(8000, () => {
  console.log("server is running");
});
