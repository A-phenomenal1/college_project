const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utility/geocode");
const weather = require("./utility/weather");

const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "A-phenomenal1",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "A-phenomenal1",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Hello, wanna some help......",
    name: "Nitesh Kumar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({
      error: "You must enter some address",
    });
  geocode(
    (location = req.query.address),
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      weather({ lat: latitude, lon: longitude }, (error, weatherData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          address: req.query.address,
          location,
          forcast: weatherData,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("helpArticle", {
    title: "Articles",
    errorMsg: "Help Article Not Found!!!",
    name: "Nitesh Kumar",
  });
});

app.get("*", (req, res) => {
  res.render("page404", {
    title: "Error",
    errorMsg: "404 Page",
    name: "A-phenomenal1",
  });
});

app.listen(port, () => {
  console.log(`Server is started at ${port}`);
});
