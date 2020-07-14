const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const weatherAPI = require("./api/weatherData");
const app = express();


const PORT = process.env.PORT || 5000;  ;

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  let error;
  console.log(typeof error)
 return res.render("index", {
    error,
    errors: null,
    lat: null,
    lon: null,
    location: null,
    temp: null,
  });
});

app.post("/", (req, res) => {
  const address = req.body.city;
  let errors = null;

  if (!address) {
    errors = `Enter a city`
   // errors.push({ msg : 'Please enyter aaa'   })
    return res.render("index", {
    error: null,
      errors,
      lat: null,
      lon: null,
      location: null,
      temp: null,
    });
  }
  weatherAPI(address, (error, { lat, lon, location, temp }) => {
    if (error) {
      res.render("index", {
        error,
        lat: null,
        lon: null,
        location: null,
        temp: null,
      });
    }
    res.render("index", {
      error: null,
      lat,
      lon,
      location: `Location: ${location} `,
      temp,
    });
  });
});

app.listen(PORT);
