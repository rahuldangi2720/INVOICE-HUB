const express = require("express");
const { AddHistory, getAllHistory } = require("../Controllers/HistoryControllers");



const HistoryRouter = express.Router();

HistoryRouter.post("/post",AddHistory)
HistoryRouter.get("/get",getAllHistory)
// HistoryRouter.get("/history",AddHistory)


module.exports= HistoryRouter;