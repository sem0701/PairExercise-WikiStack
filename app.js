const morgan = require("morgan");
const express = require("express");
const app = express();
const { db, Page, User } = require("./models");

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

const PORT = 1337;

async function wiki() {
  try {
    await db.sync({ force: true });
    await Page.sync({ force: true });
    await User.sync({ force: true });
  } catch (err) {
    console.log(err);
    await db.close;
  }
}

wiki();

app.listen(PORT, () => {
  console.log("Listening in port ", PORT);
});
