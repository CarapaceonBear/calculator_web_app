const resultText = document.getElementById("result-text");
const formulaText = document.getElementById("formula-text");

const buttonZero = document.getElementById("button-zero");
const buttonOne = document.getElementById("button-one");
const buttonTwo = document.getElementById("button-two");
const buttonThree = document.getElementById("button-three");
const buttonFour = document.getElementById("button-four");
const buttonFive = document.getElementById("button-five");
const buttonSix = document.getElementById("button-six");
const buttonSeven = document.getElementById("button-seven");
const buttonEight = document.getElementById("button-eight");
const buttonNine = document.getElementById("button-nine");
const buttonDecimal = document.getElementById("button-decimal");
const buttonBackspace = document.getElementById("button-backspace");
const buttonAdd = document.getElementById("button-add");
const buttonSubtract = document.getElementById("button-subtract");
const buttonMultiply = document.getElementById("button-multiply");
const buttonDivide = document.getElementById("button-divide");
const buttonBracket = document.getElementById("button-bracket");
const buttonRoot = document.getElementById("button-root");
const buttonPower = document.getElementById("button-power");
const buttonEquals = document.getElementById("button-equals");

console.log("script linked");

const testLog = (event) => {
    console.log(event.target.value);
}

buttonZero.addEventListener("click", testLog);
buttonOne.addEventListener("click", testLog);
buttonTwo.addEventListener("click", testLog);
buttonThree.addEventListener("click", testLog);
buttonFour.addEventListener("click", testLog);
buttonFive.addEventListener("click", testLog);
buttonSix.addEventListener("click", testLog);
buttonSeven.addEventListener("click", testLog);
buttonEight.addEventListener("click", testLog);
buttonNine.addEventListener("click", testLog);
buttonDecimal.addEventListener("click", testLog);
buttonBackspace.addEventListener("click", testLog);
buttonAdd.addEventListener("click", testLog);
buttonSubtract.addEventListener("click", testLog);
buttonMultiply.addEventListener("click", testLog);
buttonDivide.addEventListener("click", testLog);
buttonBracket.addEventListener("click", testLog);
buttonRoot.addEventListener("click", testLog);
buttonPower.addEventListener("click", testLog);
buttonEquals.addEventListener("click", testLog);
