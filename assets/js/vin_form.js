var inputElement = document.getElementById("insert-vin");
var submitButton = document.getElementById("submit-button");
inputElement.value = "KM8JN72DX7U587496";

const inputEle = $("#insert-vin").keypress((event) => {
  console.log("JQUERY EVENT: ", event);
});
console.log("INPUT ELEMENT: ", inputEle);

let inputValue = "";
let isValidInput = false;

function isValidLength(input) {
  return input.length === 17;
}

function handleInput(event) {
  inputValue = event.target.value;
  if (!isValidLength(inputValue)) {
    inputElement.style.borderColor = "red";
    inputElement.style.borderWidth = "5px";
    inputElement.style.borderStyle = "solid";
    submitButton.disabled = true;
  } else {
    inputElement.style.borderColor = "green";
    inputElement.style.borderWidth = "5px";
    inputElement.style.borderStyle = "solid";
    submitButton.disabled = false;
  }
}

function handleClick(event) {
  event.preventDefault();
  window.location.href = `vin-info.html?VIN=${inputElement.value}`;
}

inputElement.addEventListener("input", handleInput);
submitButton.addEventListener("click", handleClick);
