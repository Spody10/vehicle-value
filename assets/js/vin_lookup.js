/// capture lowercase character or digit instances junctioning with uppercase character.
const LOWERCASE_UPPERCASE_JUNCTION = /([\p{Ll}\d])(\p{Lu})/gu;
// capture instances of repeat uppercase characters followed by lowercase character.
const REPETITIOUS_UPPERCASE_TO_LOWERCASE = /(\p{Lu}+)(\p{Lu}\p{Ll}+)/gu;

function camelCaseTo(text, delimter = "-") {
  const isTextValid = typeof text === "string";
  const isSeperatorValid = typeof delimter === "string";
  const isValid = isTextValid && isSeperatorValid;
  if (!isValid) {
    throw new TypeError("the text and delimter must be of type string.");
  }
  const replacement = `$1${delimter}$2`;
  return text
    .replace(LOWERCASE_UPPERCASE_JUNCTION, replacement)
    .replace(REPETITIOUS_UPPERCASE_TO_LOWERCASE, replacement)
    .toLowerCase();
}
function formatData(data) {
  var result = data.Results[0];

  var carInfo = {};
  for (var index = 0; index < PROPERTIES_WE_WANT.length; index += 1) {
    const key = PROPERTIES_WE_WANT[index];
    const value = result[key];
    carInfo[key] = value;
  }
  return carInfo;
}
function makeGovUrl(value) {
  return `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${value}?format=json`;
}
const PROPERTIES_WE_WANT = [
  "VIN",
  "ModelYear",
  "Make",
  "Model",
  "BodyClass",
  "GVWR",
  "DriveType",
  "VehicleType",
  "FuelTypePrimary",
  "EngineCylinders",
  "EngineHP",
  "PlantCity",
  "PlantCountry",
];
async function getVehicleData(url) {
  try {
    var response = await fetch(url);
    var data = await response.json();
    const formattedData = formatData(data);

    return formattedData;
  } catch (error) {}
}
function addVehicleInfoToPage(data) {
  const vehicleDetailsContainer = document.getElementById("vehicle-details");
  const titleOfVehicleContainer = document.getElementById("vehicle-title");
  titleOfVehicleContainer.innerText = `${data.Make} ${data.Model || "unknown"}`;
  Object.keys(data).forEach((key) => {
    const value = data[key] || "none";
    const h3Element = document.createElement("h3");
    const text = document.createTextNode(
      `${camelCaseTo(key, " ").toUpperCase()}: ${value}`
    );
    h3Element.append(text);
    vehicleDetailsContainer.append(h3Element);
  });
}
async function onPageLoad() {
  let vinNumberFromUrl = new URL(window.location.href).searchParams.get("VIN");
  let vinLookupAddress = makeGovUrl(vinNumberFromUrl);
  const vehicleData = await getVehicleData(vinLookupAddress);
  addVehicleInfoToPage(vehicleData);
  addToSearchHistory(vehicleData);
}

function getUnsplash() {
  let url =
    "https://api.unsplash.com/search/photos?query=automobile&client_id=cjJQ8wK2b7HF8T4MVJ1z-QN03taag9wEgEYkMMhNKfc";
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      if (data.results) {
        const returnedData = data.results.map((result) => {
          return result != null &&
            result.urls != null &&
            result.urls.small != null
            ? `<img src=${result.urls.small}>
             <a href=${result.links.download} target="_blank">
            `
            : `<aside>error in inner loop </aside>`;
        });

        let random = Math.random();
        let totalData = returnedData.length;
        let randomIndex = Math.floor(random * totalData);
        let randomImage = returnedData[randomIndex];
        return $("#results").html(randomImage);
      }
    });
}

function getSearchHistory() {
  const searchHistory = window.localStorage.getItem("searchHistory");
  if (searchHistory) {
    const parsedSearchResults = JSON.parse(searchHistory);
    if (parsedSearchResults.length > 10) {
      window.localStorage.clear();
      return [];
    }
    return parsedSearchResults;
  }
  return [];
}

// whenever you do a search, just call this method after you get a result and pass that result in
function addToSearchHistory(itemToAdd) {
  const searchHistory = getSearchHistory();
  if (searchHistory.length === 0) {
    const firstHistory = JSON.stringify([itemToAdd]);
    localStorage.setItem("searchHistory", firstHistory);
    return;
  }
  const nextSearchHistory = searchHistory.concat(itemToAdd);
  localStorage.setItem("searchHistory", JSON.stringify(nextSearchHistory));
}

function displaySearchResults() {
  const searchHistory = getSearchHistory();

  // this clears out the search-history ul
  $("search-history").empty();
  // we will add each history item to to the search-history ul

  // just set the href to the url that you would use to search
  searchHistory.forEach(function (search) {
    // create the li
    var item = $("<li>");
    // add styles to the li to make it look like a button
    item.addClass("list-group-item btn btn-light");
    // create the string of year make model to use
    var textToAdd = `${search.ModelYear} ${search.Make} ${search.Model}`;

    // add the url to the anchor link associated to the vin number
    var anchor = $(
      `<a href="vin-info.html?VIN=${search.VIN}">${textToAdd}</a>`
    );
    // append anchor link to list item
    item.append(anchor);

    // add the li to the search-history ul
    $("#search-history").prepend(item);
  });
}
// window.localStorage.clear();
onPageLoad();
getUnsplash();
displaySearchResults();
