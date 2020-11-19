
  function lowerCaseKey(text){
    return text.charAt(0).toLowerCase() + text.slice(1);
  }
  
  function formatData(data){
    var result = data.Results[0]
    console.log("resuts: ", result)
    var carInfo = {}
    for(var index = 0; index < PROPERTIES_WE_WANT.length; index += 1){
        const key = PROPERTIES_WE_WANT[index]
        const value = result[key]
        const lowerCasedKey = lowerCaseKey(key)
        carInfo[lowerCasedKey] = value
    }
    return carInfo
  }

  function makeUrl(value){
    return `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${value}?format=json`;
  }
  
  
  const PROPERTIES_WE_WANT = ['ModelYear','Make', 'Model']
  
async function apiRequest(url){
    console.log("url", url)
    var response = await fetch(url)
    var data = await response.json()
    const formattedData = formatData(data)
    console.log("response: ", formattedData)
}

function onPageLoad(){
    let params = new URL(window.location.href).searchParams.get('VIN')
    let apiAddress = makeUrl(params)
    apiRequest(apiAddress)
}

onPageLoad()
