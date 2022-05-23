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
const numberDecimalCheck = new RegExp("[0-9.]");
const operators = ["^","√","×", "÷", "+", "-"];
const operatorCheck = new RegExp("[^0-9).]");
let currentResult = null;
let timer = null;
const delay = 1000;

console.log("script linked");
resultText.innerText = "";
formulaText.innerText = "";

const onButtonClick = (event) => {
    moveToMemory();
    console.log(event.target.value);
    // append value of button to the formula display
    formulaText.innerText += event.target.value;
}

const onOperatorClicked = (event) => {
    moveToMemory();
    console.log(event.target.value);
    if (formulaText.innerText.length > 0) {
        // "√" can't follow itself or "^"
        if (event.target.value === "√") {
            if ((formulaText.innerText[formulaText.innerText.length-1] === "√")
             || (formulaText.innerText[formulaText.innerText.length-1] === "^")) {
                 return;
                }
                // the other operators can't directly follow another operator, eg "*/" or "^+""
                // or an open bracket
            } else {
                if (operatorCheck.test(formulaText.innerText[formulaText.innerText.length-1])) {
                    console.log("test2");
                    return;
                }
        }
        formulaText.innerText += event.target.value;
        // can't start with an operator, except "√" or "-"
    } else if ((event.target.value === "√") || (event.target.value === "-")) {
        formulaText.innerText += event.target.value;
    }
}

const onEqualsClicked = (event) => {
    console.log(event.target.value);
    // if equals button is pressed, run calculation
    // if bracketCount is positive, append ")"s until it is 0
    let bracketCount = countBrackets(formulaText.innerText);
    console.log(bracketCount);
    while (bracketCount > 0) {
        formulaText.innerText += ")";
        bracketCount --
    }
    // check there is something in the formula box
    if (formulaText.innerText.length > 0) {
        // check that the final character is a number or ")"
        if ((numberCheck.test(formulaText.innerText[formulaText.innerText.length-1]))
        || (formulaText.innerText[formulaText.innerText.length-1] === ")")) {
            runCalculation(formulaText.innerText);
        }
    }
}

const onBackspaceClicked = (event) => {
    moveToMemory();
    console.log(event.target.value);
    // if backspace button is pressed, remove last character
    formulaText.innerText = formulaText.innerText
    .substring(0, formulaText.innerText.length - 1);
}

const onBracketClicked = (event) => {
    moveToMemory();
    console.log(event.target.value);
    // if bracket button is pressed, append an open bracket,
    // if there is already an open bracket, append a closed bracket. 
    let bracketCount = countBrackets(formulaText.innerText) 
    if (bracketCount == 0) {
        formulaText.innerText += "(";
    } else {
        // check if current final character is a number, or ")",
        // if not, open another bracket.
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
    // parses the formula and calculates the result.
    let returnedCalculation = calculationRunner(formula);
    //   this is handled by calculator.js and returned
    // (if the result is no different from the formula, 
    //  eg if the 'formula' is just '4', then return nothing)
    if (formulaText.innerText === returnedCalculation) {
        return;
    }
    // result is displayed in formula field.
    currentResult = returnedCalculation;
    formulaText.innerText = currentResult;
    resultText.innerText = formula;
    // on desktop, add to the record box
    addToRecord(formula, returnedCalculation);
}

const moveToMemory = () => {
    if (currentResult != null) {
        resultText.innerText = currentResult;
    }
}

const addToRecord = (formula, result) => {
    recordBox.innerHTML += `<p class="record__text"></p><p class="record__text--formula">${formula}</p><p class="record__text--result">${result}</p>`;
}

// functions for long-press on equals button
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
buttonDecimal.addEventListener("click", onOperatorClicked);
buttonBackspace.addEventListener("click", onBackspaceClicked);
buttonAdd.addEventListener("click", onOperatorClicked);
buttonSubtract.addEventListener("click", onOperatorClicked);
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
// call calculationRunner() to run

let workingFormula = "";

let bracketStart = 0;
let bracketEnd = 0;
let bracketSegment = "";
let currentCount = 0;
let preceder = 0;
let follower = 0;

const calculationRunner = (overallCalculation) => {
    workingFormula = overallCalculation;
    console.log(workingFormula);
    // first count how many times I need to pull out a bracket pair
    let segmentCount = 0;
    for (let i = 0; i < workingFormula.length; i++) {
        if (workingFormula[i] == "(") {
            segmentCount ++;
        };
    };
    // run the bracket segment calculator that many times
    for (let j = 1; j <= segmentCount; j++) {
        let segmentResult = bracketSegmenter(workingFormula);
        // check for directly preceding/following numbers or brackets
        if ((numberCheck.test(workingFormula[bracketStart-1]))
        || (workingFormula[bracketStart-1] == ")")) {
            segmentResult = `×${segmentResult}`;
        }
        if ((numberCheck.test(workingFormula[bracketEnd+1]))
        || (workingFormula[bracketEnd+1] == "(")) {
            segmentResult = `${segmentResult}×`;
        }
        // replace the calculated result in place of the bracket segment
        // .replace() won't do it, need to concat "slice before segment"+"result"+"slice after segment"
        workingFormula = 
        `${workingFormula.slice(0, bracketStart)}${segmentResult}${workingFormula.slice(bracketEnd+1, workingFormula.length)}`;
        console.log(workingFormula);
    };
    // once all the brackets are resolved, run the calculation on the simplified formula
    return(performCalculation(workingFormula));
};

const performCalculation = (segment) => {
    let workingSegment = segment
    // perform the calculation process for each operator in sequence
    operators.forEach((operator) => {
        // count how many of the given operator there are
        currentCount = 0;
        for (let i = 0; i < workingSegment.length; i++) {
            if (workingSegment[i] == operator) {
                currentCount ++;
            };
        };
        // run the calculation that many times, passing in the specific operator
        for (let j = 1; j <= currentCount; j++) {
            
            let basicResult = calculateBasic(workingSegment, operator);
            
            if (operator === "√") {
                // if a number directly precedes, insert "*"
                if (numberCheck.test(workingSegment[preceder-1])) {
                    basicResult = `×${basicResult}`;
                }
            }
            
            workingSegment = 
            `${workingSegment.slice(0, preceder)}${basicResult}${workingSegment.slice(follower+1, workingSegment.length)}`;
        };
    });
    
    return (workingSegment);
}

const bracketSegmenter = (formula) => {
    // select the bracket segment for calculation
    for (let i = formula.length; i >= 0; i--) {
        if (formula[i] == "(") {
            bracketStart = i;
            break;
        };
    };
    for (let j = bracketStart; j < formula.length; j++) {
        if (formula[j] == ")") {
            bracketEnd = j;
            break;
        };
    };
    bracketSegment = formula.slice(bracketStart+1, bracketEnd);
    console.log(`bracketSegment = ${bracketSegment}`);
    return performCalculation(bracketSegment);
}

const calculateBasic = (segment, symbol) => {
    let operator = symbol;
    // get the first operator in the current segment
    let operatorIndex = segment.indexOf(operator);
    // get the surrounding numbers
    if (operator != "√") {
        for (let i = operatorIndex-1; i >= 0; i--) {
            if (numberDecimalCheck.test(segment[i])) {
                preceder = i;
            } else {
                break;
            }
        }
    }
    for (let j = operatorIndex+1; j < segment.length; j++) {
        if (numberDecimalCheck.test(segment[j])) {
            follower = j;
        } else {
            break;
        }
    }  
    
    // grab the relevant numbers from the segment
    if (operator === "√") {
        // for roots specifically, just need the numbers after
        // however, need to update this to slice the result back in
        preceder = operatorIndex;
    }
    
    let preNumber = parseFloat(segment.slice(preceder, operatorIndex));
    let postNumber = parseFloat(segment.slice(operatorIndex+1, follower+1));
    // run the calculation, depending on the given operator
    switch(operator) {
        case "^":
            return Math.pow(preNumber, postNumber);
            case "√":
                return Math.sqrt(postNumber);
                case "×":
                    return (preNumber * postNumber);
                    case "÷":
                        return (preNumber / postNumber);
                        case "+":
                            return (preNumber + postNumber);
                            case "-":
                                return (preNumber - postNumber);
                                default:
                                    return null;
    }
}
    
// -------------------------------------------------------------------------------------------//
// ------------------------------------ COLOUR MODE ------------------------------------------//
// -------------------------------------------------------------------------------------------//
// applies new classes to each element which changes colour, corresponding with _colour-mode.scss

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