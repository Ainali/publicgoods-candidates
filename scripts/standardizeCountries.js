/* This script utility standardize the country names in
 * JSON files in digitalpublicgoods folder.
 */
const fs = require("fs");
fuzz = require("fuzzball");

const dpgpath = "./digitalpublicgoods/";

// standard list of countries from https://github.com/lacabra/submission-digitalpublicgoods/blob/main/schemas/schema.js#L1891
// combined with extended list of countries from https://github.com/unicef/publicgoods-scripts/blob/main/packages/map/public/countries_codes_and_coordinates.csv
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Côte d'Ivoire",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (fmr. 'Swaziland')",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Puerto Rico",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands",
  "American Samoa",
  "Anguilla",
  "Antarctica",
  "Aruba",
  "Bermuda",
  "Bouvet Island",
  "British Indian Ocean Territory",
  "Cayman Islands",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Cook Islands",
  "Curaçao",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gibraltar",
  "Greenland",
  "Guadeloupe",
  "Guam",
  "Guernsey",
  "Heard Island and McDonald Islands",
  "Hong Kong",
  "Ireland",
  "Isle of Man",
  "Jersey",
  "Kiribati",
  "Kosovo",
  "Macao",
  "Martinique",
  "Mayotte",
  "Montserrat",
  "Netherlands Antilles",
  "New Caledonia",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Pitcairn",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Sint Maarten (Dutch part)",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "South Georgia and the South Sandwich Islands",
  "Svalbard and Jan Mayen",
  "Taiwan",
  "Tokelau",
  "Turks and Caicos Islands",
  "United States Minor Outlying Islands",
  "Virgin Islands, British",
  "Virgin Islands, U.S.",
  "Wallis and Futuna",
  "Western Sahara",
  "Caribbean Netherlands",
];

// This object was generated by findReplacement() function
const standardizeCountry = {
  "Antigua & Barbuda": "Antigua and Barbuda",
  "Bolivia (Plurinational State of)": "Bolivia",
  "Bolivia, Plurinational State of": "Bolivia",
  Bosnia: "Bosnia and Herzegovina",
  "Bosnia & Herzegovina": "Bosnia and Herzegovina",
  "Bosnia And Herzegowina": "Bosnia and Herzegovina",
  Bravil: "Brazil",
  "Brunei Darussalam": "Brunei",
  "Cape Verde": "Cabo Verde",
  "Central African Rep.": "Central African Republic",
  Congo: "Congo (Congo-Brazzaville)",
  "Congo (the Democratic Republic of the Congo)":
    "Democratic Republic of the Congo",
  "Congo - Brazzaville": "Congo (Congo-Brazzaville)",
  "Congo, the Democratic Republic of the": "Democratic Republic of the Congo",
  "Cote D'Ivoire": "Côte d'Ivoire",
  "Cote d' Ivoire": "Côte d'Ivoire",
  "Cote d'Ivoire": "Côte d'Ivoire",
  "Cote d’Ivoire": "Côte d'Ivoire",
  "Czech Republic": "Czechia (Czech Republic)",
  Czechia: "Czechia (Czech Republic)",
  "Côte d’Ivoire": "Côte d'Ivoire",
  DRC: "Democratic Republic of the Congo",
  "Dem. Rep. Congo": "Democratic Republic of the Congo",
  "Democratic Republic of Congo": "Democratic Republic of the Congo",
  "East Timor": "Timor-Leste",
  Eswatini: "Eswatini (fmr. 'Swaziland')",
  "Falkland Islands": "Falkland Islands (Malvinas)",
  "Guinea Bissau": "Guinea-Bissau",
  Haita: "Haiti",
  "Holy See (Vatican City State)": "Holy See",
  "Iran (Islamic Republic Of)": "Iran",
  "Ivory Coast": "Côte d'Ivoire",
  "Ivory coast": "Côte d'Ivoire",
  Kazahkstan: "Kazakhstan",
  "Korea (the Republic of Korea)": "South Korea",
  "Korea, Democratic People's Republic of": "North Korea",
  "Korea, Republic of": "South Korea",
  Kyrgyztan: "Kyrgyzstan",
  "Lao People's Democratic Republic": "Laos",
  London: "United Kingdom",
  Luxemburg: "Luxembourg",
  Macedonia: "North Macedonia",
  "Macedonia, the Former Yugoslav Republic of": "North Macedonia",
  "Met Norway Weather has universal design and coverage, and serves all countries in the world with geospecific user-oriented data dissemination (supporting more than 12 million unique geolocations world-wide on Yr). The usage is largest in Norway and neighbouring countries but also relatively large in low- and middle-income countries. We have also written feedback from users that Yr and Met Norway Weather are being used and adapted for use in a range of low- and middle-income countries. To our understanding, Met Norway Weather removes barriers to access and usage in the availability of open, user-oriented, timely, high-quality weather forecast information. List of countries where recent requests to MET Norway Weather have originated (ordered after number of requests):":
    "",
  "Micronesia, Federated States Of": "Micronesia",
  "Micronesia, Federated States of": "Micronesia",
  "Moldova, Republic of": "Moldova",
  "Myanmar (Burma)": "Myanmar",
  Palestine: "Palestine State",
  "Palestine, State of": "Palestine State",
  "Republic of Congo": "Congo (Congo-Brazzaville)",
  "Republic of the Congo": "Congo (Congo-Brazzaville)",
  "Russian Federation": "Russia",
  "Sao Tome": "Sao Tome and Principe",
  "Sint Maarten": "Sint Maarten (Dutch part)",
  "Slovakia (Slovak Republic)": "Slovakia",
  Somaliland: "Somalia", //  Somaliland is an unrecognised sovereign state in the Horn of Africa, internationally considered[11][12] to be part of Somalia.
  "South Georgia And South S.S.":
    "South Georgia and the South Sandwich Islands",
  SouthAfrica: "South Africa",
  "St. Helena": "Saint Helena, Ascension and Tristan da Cunha",
  "St. Kitts & Nevis": "Saint Kitts and Nevis",
  "St. Lucia": "Saint Lucia",
  "St. Martin": "Saint Martin (French part)",
  "St. Pierre & Miquelon": "Saint Pierre and Miquelon",
  "St. Barthélemy": "Saint Barthélemy",
  "St. Pierre And Miquelon": "Saint Pierre and Miquelon",
  "St. Vincent & Grenadines": "Saint Vincent and the Grenadines",
  "State of Palestine": "Palestine State",
  Swaziland: "Eswatini (fmr. 'Swaziland')",
  "Syrian Arab Republic": "Syria",
  "São Tomé & Príncipe": "Sao Tome and Principe",
  "Taiwan, Province of China": "Taiwan",
  "Tanzania, United Republic of": "Tanzania",
  "The Faroe Islands": "Faroe Islands",
  "The Gambia": "Gambia",
  "Trinidad & Tobago": "Trinidad and Tobago",
  "Turks & Caicos Islands": "Turks and Caicos Islands",
  "Turks And Caicos Islands": "Turks and Caicos Islands",
  "U.S. Virgin Islands": "Virgin Islands, U.S.",
  UK: "United Kingdom",
  US: "United States of America",
  USA: "United States of America",
  "United Kingdom of Great Britain And Northern Ireland": "United Kingdom",
  "United Kingdom of Great Britain and Northern Ireland": "United Kingdom",
  "United Republic of Tanzania": "Tanzania",
  "United States": "United States of America",
  "Unites States": "United States of America",
  Vanuata: "Vanuatu",
  "Venezuela, Bolivarian Republic of": "Venezuela",
  "Viet Nam": "Vietnam",
  "Virgin Islands (British)": "Virgin Islands, British",
  "Virgin Islands (U.S.)": "Virgin Islands, U.S.",
  "Wallis & Futuna": "Wallis and Futuna",
  Zimbwabwe: "Zimbabwe",
  "eSwatini (former Swaziland)": "Eswatini (fmr. 'Swaziland')",
  "Bonaire, Sint Eustatius and Saba": "Caribbean Netherlands",
  "Bonaire, Sint Eustatius, and Saba": "Caribbean Netherlands",
  "British Virgin Islands": "Virgin Islands, British",
};

var badCountries = {};
// Reads JSON schema and returns object
function readSchema(filename) {
  const data = fs.readFileSync(filename, "utf8", function (err) {
    if (err) {
      console.log(
        "An error occured while reading JSON Object from file: " + filename
      );
      return console.log(err);
    }
  });
  return JSON.parse(data);
}

const sortObject = (obj) =>
  Object.keys(obj)
    .sort()
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

const options = {
  scorer: fuzz.partial_ratio, // Any function that takes two values and returns a score, default: ratio
  limit: 2, // Max number of top results to return, default: no limit / 0.
  cutoff: 50, // Lowest score to return, default: 0
  unsorted: false, // Results won't be sorted if true, default: false. If true limit will be ignored.
};

function findReplacement(country, listOfCountries, filename) {
  if (
    !listOfCountries
      .map((countryName) => countryName.toLowerCase())
      .includes(country.toLowerCase()) &&
    country !== ""
  ) {
    console.log(
      country,
      "isn't in a standard list of country names:",
      filename
    );
    return (badCountries[country] = fuzz
      .extract(country, listOfCountries, options)
      .map((el) => el[0])
      .toString());
  }
}

function needChangeCountry(country) {
  if (
    !countries
      .map((countryName) => countryName.toLowerCase())
      .includes(country.toLowerCase()) &&
    standardizeCountry[country]
  ) {
    return true;
  } else {
    return false;
  }
}

let fix = false;
if (process.argv.length == 3 && process.argv[2] == "--fix") {
  fix = true;
}

fs.readdirSync(dpgpath).forEach((file) => {
  let changeFlag = false;
  let dpg = readSchema(dpgpath + file);
  ["developmentCountries", "deploymentCountries"].map((label) => {
    dpg.locations[label] = dpg.locations[label].map((country) => {
      // uncomment findReplacement(country, countries) if you want to add replacements for countries in badCountries object and then update standardizeCountry object
      !fix && findReplacement(country, countries, file);
      if (fix && needChangeCountry(country)) {
        changeFlag = true;
        return standardizeCountry[country];
      } else {
        return country;
      }
    });
  });

  if (changeFlag)
    fs.writeFileSync(dpgpath + file, JSON.stringify(dpg, null, 2) + "\n");
});
if (!fix) {
  if (Object.keys(badCountries).length > 0) {
    console.log(
      "\nA generated object with two possible replacements for every misspeled country name based on the similarity to the countries in the standard list: \n ",
      sortObject(badCountries),
      "\n Try to re-run with --fix to quick fix. If it fails change country names manually to match the standard list of countries."
    );
    process.exit(1);
  }
}
