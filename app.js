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

let currentResult = null

console.log("script linked");
resultText.innerText = "";
formulaText.innerText = "";

const onButtonClick = (event) => {
    console.log(event.target.value);
    // if equals button is pressed, run calculation
    if (event.target.value === "=") {
        runCalculation(formulaText.innerText);
    // if backspace button is pressed, remove last character
    } else if (event.target.value === "backspace") {
        formulaText.innerText = formulaText.innerText
        .substring(0, formulaText.innerText.length - 1);
    // if bracket button is pressed, append an open bracket,
    // if there is already an open bracket, append a closed bracket.

    
    // otherwise append the value of the button
    } else {
        formulaText.innerText += event.target.value;
    }

}

const runCalculation = (formula) => {
    // parses the formula and calculates the result.
    // result is displayed in both formula field.
    // it will also display in result field, after input continues.

    // placeholder
    currentResult = formula;
    formulaText.innerText = currentResult;
    // temporary, move to onButtonClick later, to be triggered on first 
    // input after calculation.
    resultText.innerText = currentResult;
}

buttonZero.addEventListener("click", onButtonClick);
buttonOne.addEventListener("click", onButtonClick);
buttonTwo.addEventListener("click", onButtonClick);
buttonThree.addEventListener("click", onButtonClick);
buttonFour.addEventListener("click", onButtonClick);
buttonFive.addEventListener("click", onButtonClick);
buttonSix.addEventListener("click", onButtonClick);
buttonSeven.addEventListener("click", onButtonClick);
buttonEight.addEventListener("click", onButtonClick);
buttonNine.addEventListener("click", onButtonClick);
buttonDecimal.addEventListener("click", onButtonClick);
buttonBackspace.addEventListener("click", onButtonClick);
buttonAdd.addEventListener("click", onButtonClick);
buttonSubtract.addEventListener("click", onButtonClick);
buttonMultiply.addEventListener("click", onButtonClick);
buttonDivide.addEventListener("click", onButtonClick);
buttonBracket.addEventListener("click", onButtonClick);
buttonRoot.addEventListener("click", onButtonClick);
buttonPower.addEventListener("click", onButtonClick);
buttonEquals.addEventListener("click", onButtonClick);
