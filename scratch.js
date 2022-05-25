const interpretEquation = (overallEquation) => {
    let workingEquation = [...overallEquation];
    let bracketCount = countSymbols(workingEquation, "(" );
    workingEquation = resolveBracketPairs(bracketCount, workingEquation);
    let finalResult = runCalculations(workingEquation);
    finalResult = replaceNegativeNumbers(finalResult);
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
        if (bracketSegment.length == 0) {
            workingEquation = workingEquation.slice(0, segmentStart])
        } else {
            if ((numberCheck.test(workingEquation[segmentStart - 1]))
            || (workingFormula[segmentStart - 1] == ")" )) {
                bracketSegment = `×${bracketSegment}`;
            }
            if ((numberCheck.test(workingEquation[segmentEnd + 1]))
            || (workingEquation[segmentEnd + 1] == "(" )) {
                bracketSegment = `${bracketSegment}×`;
            }
            workingEquation = 
            `${workingEquation.slice(0, segmentStart)}${bracketSegment}
            ${workingEquation.slice(segmentEnd + 1, workingEquation.length)}`;
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
            if (operator === "√") {
                if (numberCheck.test(workingEquation[precedingIndex - 1])) {
                    calculationResult = `×${calculationResult}`;
                }
            }
            workingEquation = 
            `${workingEquation.slice(0, precedingIndex)}${calculationResult}
            ${workingEquation.slice(followingIndex + 1, workingEquation.length)}`;
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
    result = parseNegativeNumbers(result.toString());
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
}
