const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

const FILES_PATH = process.cwd();

app.listen(PORT, function () {
  console.log(`I'm listening on port : `, PORT);
});

const verifyLang = function (req, res, next) {
  if (req.query.lang === undefined) {
    res.send({ error: true, message: "You must specify language" });
  }
  next();
};

app.get("/compounds/all", verifyLang, (req, res, next) => {
  try {
    var data = JSON.parse(
      fs
        .readFileSync(
          path.join(
            FILES_PATH,
            `/chemical_compounds_${req.query.lang.trim()}.json`
          )
        )
        .toString("utf8")
    );

    res.send(data);
  } catch (err) {
    res.status(500).send({ error: true, message: "Invalid input syntax" });
  }
});

const thereIsName = function (req, res, next) {
  if (req.query.name !== undefined) {
    try {
      var data = JSON.parse(
        fs
          .readFileSync(
            path.join(
              FILES_PATH,
              `chemical_compounds_${req.query.lang.trim()}.json`
            )
          )
          .toString("utf8")
      );
      var selected = data.filter((el) => {
        return (
          el.name.toLowerCase().trim().toString() ===
          req.query.name.trim().toLowerCase().toString()
        );
      });
      res.send(selected);
    } catch (err) {
      res.status(500).send({ error: true, message: "Invalid input syntax" });
    }
  } else {
    next();
  }
};

const filterMinAndMax = function (req, res, next) {
  if (req.query.max !== undefined || req.query.min !== undefined) {
    try {
      var data = JSON.parse(
        fs
          .readFileSync(
            path.join(
              FILES_PATH,
              `chemical_compounds_${req.query.lang.trim()}.json`
            )
          )
          .toString("utf8")
      );
      var selected = null;
      if (req.query.max !== undefined && req.query.min !== undefined) {
        selected = data.filter(
          (el) =>
            el.molarMass > parseFloat(req.query.min) &&
            el.molarMass < parseFloat(req.query.max)
        );
      } else if (req.query.max !== undefined) {
        selected = data.filter(
          (el) => el.molarMass < parseFloat(req.query.max)
        );
      } else {
        selected = data.filter(
          (el) => el.molarMass > parseFloat(req.query.min)
        );
      }
      console.log(selected);
      res.send(selected);
    } catch (err) {
      res.status(500).send({ error: true, message: "Invalid input syntax" });
    }
  } else {
    res.status(500).send({ error: true, message: "Undefined input" });
  }
};
app.get(
  "/compounds",
  verifyLang,
  thereIsName,
  filterMinAndMax,
  (req, res, next) => {}
);

app.get("/compounds/byId", verifyLang, (req, res, next) => {
  if (req.query.id !== undefined) {
    console.log(req.query.id);
    try {
      var data = JSON.parse(
        fs
          .readFileSync(
            path.join(
              FILES_PATH,
              `chemical_compounds_${req.query.lang.trim()}.json`
            )
          )
          .toString("utf8")
      );
      var selected = data.filter((el) => {
        return el.no === parseInt(req.query.id);
      });
      res.send(selected[0]);
    } catch (err) {
      res.status(500).send({ error: true, message: "Invalid input syntax" });
    }
  } else {
    res.status(500).send({ error: true, message: "Undefined input" });
  }
});
