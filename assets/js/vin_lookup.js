// capture lowercase character or digit instances junctioning with uppercase character.
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
  console.log("results: ", result);
  var carInfo = {};
  for (var index = 0; index < PROPERTIES_WE_WANT.length; index += 1) {
    const key = PROPERTIES_WE_WANT[index];
    const value = result[key];

    carInfo[key] = value;
  }
  return carInfo;
}

function getUnsplash() {
  //let clientID = "cjJQ8wK2b7HF8T4MVJ1z-QN03taag9wEgEYkMMhNKfc"
  let url =
    "https://api.unsplash.com/search/photos?query=automobile&client_id=cjJQ8wK2b7HF8T4MVJ1z-QN03taag9wEgEYkMMhNKfc";

  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);

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

        console.log(returnedData.length);
        let random = Math.random();
        let totalData = returnedData.length;
        let randomIndex = Math.floor(random * totalData);
        let randomImage = returnedData[randomIndex];
        return $("#results").html(randomImage);
      }
    });
}

function makeGovUrl(value) {
  return `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${value}?format=json`;
}

const PROPERTIES_WE_WANT = [
  "ModelYear",
  "Make",
  "Model",
  "GVWR",
  "FuelTypePrimary",
  "EngineCylinders",
  "EngineHP",
  "PlantCity",
];

async function getVehicleData(url) {
  console.log("url", url);
  try {
    var response = await fetch(url);
    var data = await response.json();
    const formattedData = formatData(data);
    console.log("response: ", formattedData);
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
}

onPageLoad();
getUnsplash();
