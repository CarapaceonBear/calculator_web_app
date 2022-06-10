// -------------------------------------------------------------------------------------------//
// ------------------------------- INTERACTIVE ELEMENTS --------------------------------------//
// -------------------------------------------------------------------------------------------//

const resultText = document.getElementById("result-text");
const formulaText = document.getElementById("formula-text");
const recordBox = document.getElementById("record-box");
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

const numberCheck = new RegExp('[0-9]');
const operators = ["^","√","×", "÷", "+", "-"];
const operatorCheck = new RegExp("[^0-9)]");
let currentResult = null;
resultText.innerText = "";
formulaText.innerText = "";
let timer = null;
const delay = 1000;

const onButtonClicked = (event) => {
    moveToMemory();
    formulaText.innerText += event.target.value;
}

const onOperatorClicked = (event) => {
    // ( "-" is not included here, because it can follow any operator)
    moveToMemory();
    if (formulaText.innerText.length > 0) {
        if (event.target.value === "√") {
            if ((formulaText.innerText[formulaText.innerText.length-1] === "√")
             || (formulaText.innerText[formulaText.innerText.length-1] === "^")) {
                 return;
                }
            } else {
                if (operatorCheck.test(formulaText.innerText[formulaText.innerText.length-1])) {
                    console.log("test2");
                    return;
                }
        }
        formulaText.innerText += event.target.value;
    } else if (event.target.value === "√") {
        formulaText.innerText += event.target.value;
    }
}

const onEqualsClicked = (event) => {
    let bracketCount = countBrackets(formulaText.innerText);
    while (bracketCount > 0) {
        formulaText.innerText += ")";
        bracketCount --
    }
    if (formulaText.innerText.length > 0) {
        if ((numberCheck.test(formulaText.innerText[formulaText.innerText.length-1]))
        || (formulaText.innerText[formulaText.innerText.length-1] === ")")) {
            runCalculation(formulaText.innerText);
        }
    }
}

const onBackspaceClicked = (event) => {
    moveToMemory();
    formulaText.innerText = formulaText.innerText
    .substring(0, formulaText.innerText.length - 1);
}

const onBracketClicked = (event) => {
    moveToMemory();
    let bracketCount = countBrackets(formulaText.innerText) 
    if (bracketCount == 0) {
        formulaText.innerText += "(";
    } else {
        if ((numberCheck.test(formulaText.innerText[formulaText.innerText.length-1]))
        || (formulaText.innerText[formulaText.innerText.length-1] === ")")) {
            formulaText.innerText += ")";
        } else {
            formulaText.innerText += "(";
        }
    }
}

const countBrackets = (formula) => {
    let count = 0;
    for (let i = 0; i < formula.length; i++) {
        if (formula[i] === "(") {
            count ++;
        } else if (formula[i] === ")") {
            count --;
        }
    }
    return count;
}

const runCalculation = (formula) => {
    let returnedCalculation = interpretEquation(formula);
    if (formulaText.innerText === returnedCalculation) {
        return;
    }
    currentResult = returnedCalculation;
    formulaText.innerText = currentResult;
    resultText.innerText = formula;
    addToRecord(formula, returnedCalculation);
}

// triggered by most button presses, move result to memory only when starting the next calculation
const moveToMemory = () => {
    if (currentResult != null) {
        resultText.innerText = currentResult;
    }
}

const addToRecord = (formula, result) => {
    recordBox.innerHTML += `<p class="record__text"></p><p class="record__text--formula">${formula}</p><p class="record__text--result">${result}</p>`;
}

const startLongPress = (event) => {
    timer = setTimeout(fullClear.bind(), delay);
}
const cancelLongPress = () => {
    clearTimeout(timer);
}
const fullClear = () => {
    formulaText.innerText = "";
    resultText.innerText = "";
    currentResult = null;
}

buttonZero.addEventListener("click", onButtonClicked);
buttonOne.addEventListener("click", onButtonClicked);
buttonTwo.addEventListener("click", onButtonClicked);
buttonThree.addEventListener("click", onButtonClicked);
buttonFour.addEventListener("click", onButtonClicked);
buttonFive.addEventListener("click", onButtonClicked);
buttonSix.addEventListener("click", onButtonClicked);
buttonSeven.addEventListener("click", onButtonClicked);
buttonEight.addEventListener("click", onButtonClicked);
buttonNine.addEventListener("click", onButtonClicked);
buttonDecimal.addEventListener("click", onOperatorClicked);
buttonBackspace.addEventListener("click", onBackspaceClicked);
buttonAdd.addEventListener("click", onOperatorClicked);
buttonSubtract.addEventListener("click", onButtonClicked);
buttonMultiply.addEventListener("click", onOperatorClicked);
buttonDivide.addEventListener("click", onOperatorClicked);
buttonBracket.addEventListener("click", onBracketClicked);
buttonRoot.addEventListener("click", onOperatorClicked);
buttonPower.addEventListener("click", onOperatorClicked);
buttonEquals.addEventListener("click", onEqualsClicked);
buttonBackspace.addEventListener("mousedown", startLongPress);
buttonBackspace.addEventListener("touchstart", startLongPress);
buttonBackspace.addEventListener("mouseup", cancelLongPress);
buttonBackspace.addEventListener("touchend", cancelLongPress);

// -------------------------------------------------------------------------------------------//
// ------------------------------------- CALCULATOR ------------------------------------------//
// -------------------------------------------------------------------------------------------//

const interpretEquation = (overallEquation) => {
    let workingEquation = overallEquation;
    let bracketCount = countSymbols(workingEquation, "(" );
    workingEquation = resolveBracketPairs(bracketCount, workingEquation);
    if (workingEquation === "Infinity") {
        return workingEquation;
    }
    let finalResult = runCalculations(workingEquation);
    console.log(finalResult);
    if (finalResult != "Infinity") {
        finalResult = replaceNegativeNumbers(finalResult);
    }
    return finalResult;
}

const resolveBracketPairs = (count, equation) => {
    let numberCheck = new RegExp('[0-9]');
    let bracketCount = count;
    let workingEquation = equation
    for (let j = 1; j <= bracketCount; j++) {
        let bracketSegmentData = retrieveBracketSegment(workingEquation);
        let segmentStart = bracketSegmentData[0];
        let segmentEnd = bracketSegmentData[1];
        let bracketSegment = runCalculations(bracketSegmentData[2]);
        if (bracketSegment === "Infinity") {
            workingEquation = bracketSegment;
            break;
        }
        if (bracketSegment.length == 0) {
            workingEquation = workingEquation.slice(0, segmentStart)
        } else {
            if ((numberCheck.test(workingEquation[segmentStart - 1]))
            || (workingEquation[segmentStart - 1] == ")" )) {
                bracketSegment = `×${bracketSegment}`;
            }
            if ((numberCheck.test(workingEquation[segmentEnd + 1]))
            || (workingEquation[segmentEnd + 1] == "(" )) {
                bracketSegment = `${bracketSegment}×`;
            }
            workingEquation = 
            `${workingEquation.slice(0, segmentStart)}${bracketSegment}${workingEquation.slice(segmentEnd + 1, workingEquation.length)}`;
        }
    }
    return workingEquation;
}

const retrieveBracketSegment = (workingEquation) => {
    let openingBracketIndex = 0;
    for (let i = workingEquation.length; i >= 0; i--) {
        if (workingEquation[i] == "(" ) {
            openingBracketIndex = i;
            break;
        }
    }
    let closingBracketIndex = 0;
    for (let j = openingBracketIndex; j < workingEquation.length; j++) {
        if (workingEquation[j] == ")" ) {
            closingBracketIndex = j;
            break;
        }
    }
    bracketSegment = workingEquation.slice(openingBracketIndex + 1, closingBracketIndex);
    return [openingBracketIndex, closingBracketIndex, bracketSegment];
}

const runCalculations = (equation) => {
    let operators = ["^","√","×", "÷", "+", "-"];
    let numberCheck = new RegExp('[0-9]');
    let workingEquation = swapOutNegativeNumbers(equation);
    operators.forEach((operator) => {
        currentCount = countSymbols(workingEquation, operator)
        for (let i = 1; i <= currentCount; i ++) {
            let calculationData = takeNumbersFromEquation(workingEquation, operator);
            let precedingIndex = calculationData[0];
            let followingIndex = calculationData[1];
            let calculationResult = performArithmetic(calculationData[2], calculationData[3], operator);
            console.log(calculationResult);
            if (calculationResult === Infinity) {
                workingEquation = calculationResult;
                break;
            }
            if (operator === "√") {
                if (numberCheck.test(workingEquation[precedingIndex - 1])) {
                    calculationResult = `×${calculationResult}`;
                }
            }
            workingEquation = 
            `${workingEquation.slice(0, precedingIndex)}${calculationResult}${workingEquation.slice(followingIndex + 1, workingEquation.length)}`;
        }
    });
    return workingEquation;
}

const takeNumbersFromEquation = (equation, symbol) => {
    let expandedNumberCheck = new RegExp("[n0-9.]");
    let workingEquation = equation;
    let operator = symbol;
    let operatorIndex = workingEquation.indexOf(operator);
    let precedingIndex = 0;
    if (operator != "√") {
        for (let i = operatorIndex - 1; i >= 0; i--) {
            if (expandedNumberCheck.test(workingEquation[i])) {
                precedingIndex = i
            } else {
                break;
            }
        }
    } else {
        precedingIndex = operatorIndex;
    }
    let followingIndex = 0;
    for (let j = operatorIndex + 1; j < workingEquation.length; j++) {
        if (expandedNumberCheck.test(workingEquation[j])) {
            followingIndex = j;
        } else {
            break;
        }
    }
    let precedingNumber = workingEquation.slice(precedingIndex, operatorIndex);
    let followingNumber = workingEquation.slice(operatorIndex + 1, followingIndex + 1);
    precedingNumber = parseFloat(replaceNegativeNumbers(precedingNumber));
    followingNumber = parseFloat(replaceNegativeNumbers(followingNumber));
    return [precedingIndex, followingIndex, precedingNumber, followingNumber]
}

const performArithmetic = (firstNumber, secondNumber, symbol) => {
    let precedingNumber = firstNumber;
    let followingNumber = secondNumber;
    let operator = symbol;
    let result = 0;
    switch(operator) {
        case "^":
            result = Math.pow(precedingNumber, followingNumber);
            break;
        case "√":
            result = Math.sqrt(followingNumber);
            break;
        case "×":
            result = (precedingNumber * followingNumber);
            break;
        case "÷":
            result = (precedingNumber / followingNumber);
            break;
        case "+":
            result = (precedingNumber + followingNumber);
            break;
        case "-":
            result = (precedingNumber - followingNumber);
            break;
        default:
            result = null;
    }
    if (result != Infinity) {
        result = swapOutNegativeNumbers(result.toString());
    }
    return result;
}

const countSymbols = (section, symbol) => {
    let count = 0;
    for (let i = 0; i < section.length; i++) {
        if (section[i] == symbol) {
            count ++;
        }
    }
    return count;
}

const swapOutNegativeNumbers = (segment) => {
    let negativeSegment = segment;
    if (negativeSegment == null) {
        return negativeSegment;
    }
    for (let i = 0; i < negativeSegment.length; i++) {
        if (negativeSegment[i] === "-") {
            if (i === 0) {
                negativeSegment = `n${negativeSegment.slice(1, negativeSegment.length)}`;
            } else if (! numberCheck.test(negativeSegment[i-1])) {
                negativeSegment = `${negativeSegment.slice(0, i)}n${negativeSegment.slice(i+1, negativeSegment.length)}`;
            }
        }
    }
    return negativeSegment;
}

const replaceNegativeNumbers = (segment) => {
    let number = segment;
    for (let i = 0; i < number.length; i++) {
        if (number[i] == "n") {
            if (i == 0) {
                number = `-${number.slice(1, number.length)}`;
            } else {
                number = `${number.slice(0, i)}-${number.slice(i + 1, number.length)}`;
            }
        }
    }
    return number;
}
    
// -------------------------------------------------------------------------------------------//
// ------------------------------------ COLOUR MODE ------------------------------------------//
// -------------------------------------------------------------------------------------------//

const darkModeButton = document.getElementById("dark-mode-button");
const lightModeButton = document.getElementById("light-mode-button");
const githubButton = document.getElementById("github-button");
const body = document.getElementById("body");
const colourMode = document.getElementById("colour-mode");
const github = document.getElementById("github");
const fullDisplay = document.getElementById("full-display");

const boxZero = document.getElementById("box-zero");
const boxOne = document.getElementById("box-one");
const boxTwo = document.getElementById("box-two");
const boxThree = document.getElementById("box-three");
const header = document.getElementById("header");
const boxFour = document.getElementById("box-four");
const boxFive = document.getElementById("box-five");
const boxSix = document.getElementById("box-six");
const boxSeven = document.getElementById("box-seven");
const boxEight = document.getElementById("box-eight");
const boxNine = document.getElementById("box-nine");
const boxDecimal = document.getElementById("box-decimal");
const boxBackspace = document.getElementById("box-backspace");
const boxAdd = document.getElementById("box-add");
const boxSubtract = document.getElementById("box-subtract");
const boxMultiply = document.getElementById("box-multiply");
const boxDivide = document.getElementById("box-divide");
const boxBracket = document.getElementById("box-bracket");
const boxRoot = document.getElementById("box-root");
const boxPower = document.getElementById("box-power");
const boxEquals = document.getElementById("box-equals");


const onLightModeClicked = () => {
    lightModeButton.classList.add("hide-button");
    darkModeButton.classList.remove("hide-button");

    body.classList.add("body--light");
    colourMode.classList.add("nav__colour-mode--light");
    github.classList.add("nav__github--light");
    githubButton.classList.add("nav__github--button-light");
    header.classList.add("header--light");
    recordBox.classList.add("record--light");
    fullDisplay.classList.add("full-display--light");

    boxZero.classList.add("main__box--light3");
    boxOne.classList.add("main__box--light3");
    boxTwo.classList.add("main__box--light3");
    boxThree.classList.add("main__box--light3");
    boxFour.classList.add("main__box--light3");
    boxFive.classList.add("main__box--light3");
    boxSix.classList.add("main__box--light3");
    boxSeven.classList.add("main__box--light3");
    boxEight.classList.add("main__box--light3");
    boxNine .classList.add("main__box--light3");
    boxDecimal.classList.add("main__box--light2");
    boxBackspace.classList.add("main__box--light2");
    boxAdd .classList.add("main__box--light2");
    boxSubtract.classList.add("main__box--light2");
    boxMultiply.classList.add("main__box--light2");
    boxDivide.classList.add("main__box--light2");
    boxBracket.classList.add("main__box--light2");
    boxRoot .classList.add("main__box--light2");
    boxPower.classList.add("main__box--light2");
    boxEquals.classList.add("main__box--light1");

    buttonZero.classList.add("main__button--light");
    buttonOne.classList.add("main__button--light");
    buttonTwo.classList.add("main__button--light");
    buttonThree.classList.add("main__button--light");
    buttonFour.classList.add("main__button--light");
    buttonFive.classList.add("main__button--light");
    buttonSix.classList.add("main__button--light");
    buttonSeven.classList.add("main__button--light");
    buttonEight.classList.add("main__button--light");
    buttonNine .classList.add("main__button--light");
    buttonDecimal.classList.add("main__button--light");
    buttonBackspace.classList.add("main__button--light");
    buttonAdd.classList.add("main__button--light");
    buttonSubtract.classList.add("main__button--light");
    buttonMultiply.classList.add("main__button--light");
    buttonDivide.classList.add("main__button--light");
    buttonBracket.classList.add("main__button--light");
    buttonRoot .classList.add("main__button--light");
    buttonPower.classList.add("main__button--light");
    buttonEquals.classList.add("main__button--light");
}

const onDarkModeClicked = () => {
    darkModeButton.classList.add("hide-button");
    lightModeButton.classList.remove("hide-button");

    body.classList.remove("body--light");
    colourMode.classList.remove("nav__colour-mode--light");
    github.classList.remove("nav__github--light");
    githubButton.classList.remove("nav__github--button-light");
    header.classList.remove("header--light");
    recordBox.classList.remove("record--light");
    fullDisplay.classList.remove("full-display--light");

    boxZero.classList.remove("main__box--light3");
    boxOne.classList.remove("main__box--light3");
    boxTwo.classList.remove("main__box--light3");
    boxThree.classList.remove("main__box--light3");
    boxFour.classList.remove("main__box--light3");
    boxFive.classList.remove("main__box--light3");
    boxSix.classList.remove("main__box--light3");
    boxSeven.classList.remove("main__box--light3");
    boxEight.classList.remove("main__box--light3");
    boxNine .classList.remove("main__box--light3");
    boxDecimal.classList.remove("main__box--light2");
    boxBackspace.classList.remove("main__box--light2");
    boxAdd .classList.remove("main__box--light2");
    boxSubtract.classList.remove("main__box--light2");
    boxMultiply.classList.remove("main__box--light2");
    boxDivide.classList.remove("main__box--light2");
    boxBracket.classList.remove("main__box--light2");
    boxRoot .classList.remove("main__box--light2");
    boxPower.classList.remove("main__box--light2");
    boxEquals.classList.remove("main__box--light1");

    buttonZero.classList.remove("main__button--light");
    buttonOne.classList.remove("main__button--light");
    buttonTwo.classList.remove("main__button--light");
    buttonThree.classList.remove("main__button--light");
    buttonFour.classList.remove("main__button--light");
    buttonFive.classList.remove("main__button--light");
    buttonSix.classList.remove("main__button--light");
    buttonSeven.classList.remove("main__button--light");
    buttonEight.classList.remove("main__button--light");
    buttonNine .classList.remove("main__button--light");
    buttonDecimal.classList.remove("main__button--light");
    buttonBackspace.classList.remove("main__button--light");
    buttonAdd.classList.remove("main__button--light");
    buttonSubtract.classList.remove("main__button--light");
    buttonMultiply.classList.remove("main__button--light");
    buttonDivide.classList.remove("main__button--light");
    buttonBracket.classList.remove("main__button--light");
    buttonRoot .classList.remove("main__button--light");
    buttonPower.classList.remove("main__button--light");
    buttonEquals.classList.remove("main__button--light");  
};
    
lightModeButton.addEventListener("click", onLightModeClicked);
darkModeButton.addEventListener("click", onDarkModeClicked);