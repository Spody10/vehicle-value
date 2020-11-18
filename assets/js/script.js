//var VIN= document.getElementById("insert-vin").innerHTML;
var VIN = "3GCRKSE34AG162050";
var api = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${VIN}?format=json`;
const carDetailsObj = {};
// var apiCallAsync = async () => {
//   const res = await fetch(api);
//   const data = await res.json();
//   carDetailsObj["model"] = data.Results[0].Model;
//   carDetailsObj["modelYear"] = data.Results[0].ModelYear;
//   console.log(carDetailsObj);
// };

function apiCall() {
  fetch(api)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      carDetailsObj["modelYear"] = data.Results[0].ModelYear;
      carDetailsObj["make"] = data.Results[0].Make;
      carDetailsObj["model"] = data.Results[0].Model;
      carDetailsObj["trim"] = data.Results[0].Trim;
      carDetailsObj["doors"] = data.Results[0].Doors;
      carDetailsObj["bodyClass"] = data.Results[0].BodyClass;
      carDetailsObj["fuelTypePrimary"] = data.Results[0].FuleTypePrimary;
      carDetailsObj["engineCylinders"] = data.Results[0].EngineCylinders;
      carDetailsObj["engineHorsePower"] = data.Results[0].EngineHP;
      carDetailsObj["transmissionStyle"] = data.Results[0].TransmissionStyle;
      carDetailsObj["manufacturedInCity"] = data.Results[0].PlantCity;
      carDetailsObj["manufacturedInCountry"] = data.Results[0].PlantCountry;


      console.log(carDetailsObj);
    });
}
apiCall();
