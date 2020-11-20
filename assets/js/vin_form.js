var inputElement = document.getElementById("insert-vin");
var submitButton = document.getElementById("submit-button");
inputElement.value = "KM8JN72DX7U587496";

let inputValue = "";
let isValidInput = false;

function isValidLength(input) {
  return input.length === 17;
}

function handleInput(event) {
  console.log("event: ", event);
  console.log("key down event: ", event.target.value);
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
  console.log("printed click event: ", event);
  console.log("input value: ", inputElement.value);
  window.location.href = `vin-info.html?VIN=${inputElement.value}`;
}

inputElement.addEventListener("input", handleInput);
submitButton.addEventListener("click", handleClick);
