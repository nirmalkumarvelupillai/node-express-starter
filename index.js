const express = require("express");


const DEFAULT_PORT = 3000;
const APP_PORT = process.env.APP_PORT || DEFAULT_PORT;

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: 'starter project'
  });
});

app.set("APP_PORT", APP_PORT);
app.listen(APP_PORT, () => {
  console.log(`Running on ${APP_PORT}`);
});