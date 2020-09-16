const fs = require("fs");
const { parse } = require("node-html-parser");
const axios = require("axios");

const sources = [
  {
    lang: "it",
    url: "https://www.periodni.com/it/solcalc-composti_chimici.html",
  },
  {
    lang: "en",
    url: "https://www.periodni.com/solcalc-chemical_compounds.html",
  },
  {
    lang: "es",
    url: "https://www.periodni.com/es/solcalc-compuestos_quimicos.html",
  },
  {
    lang: "fr",
    url: "https://www.periodni.com/fr/solcalc-composes_chimiques.html",
  },
  {
    lang: "de",
    url: "https://www.periodni.com/de/solcalc-chemischen_verbindungen.html",
  },
];

async function getData(lang, url) {
  var res = await axios.default.get(url);
  var parsedHtml = parse(res.data);

  var tableRows = parsedHtml
    .querySelector("#ebody")
    .querySelector("div.tablica")
    .querySelector("table").childNodes;

  var compounds = [];

  for (var i = 1; i < tableRows.length; i = i + 2) {
    const obj = {
      no: parseInt(tableRows[i].childNodes[0].text),
      name: tableRows[i].childNodes[1].text,
      formula: tableRows[i].childNodes[2].text,
      molarMass: parseFloat(tableRows[i].childNodes[3].text),
      density: tableRows[i].childNodes[4].text.toString().split("(")[0].trim(),
      rangeOfConcentration:
        tableRows[i].childNodes[4].text.length > 3
          ? tableRows[i].childNodes[4].text
              .toString()
              .split("%")[1]
              .trim()
              .replace("(", "")
              .replace(")", "")
          : null,
    };
    compounds.push(obj);
  }
  compounds.splice(0, 1);

  fs.writeFileSync(
    `./chemical_compounds_${lang}.json`,
    JSON.stringify(compounds)
  );
}
for (var el in sources) {
  getData(sources[el].lang, sources[el].url);
}
