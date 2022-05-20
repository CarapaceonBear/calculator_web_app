// scripts for running the calculator
// call calculationRunner() to run

let workingFormula = "";

const numberCheck = new RegExp("[0-9]");
const numberDecimalCheck = new RegExp("[0-9.]");
const operators = ["*", "/", "+", "-"];

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
    console.log(`segment count: ${segmentCount}`);
    // run the bracket segment calculator that many times
    for (let j = 1; j <= segmentCount; j++) {
        let segmentResult = bracketSegmenter(workingFormula);
        // check for directly preceding/following numbers or brackets
        if ((numberCheck.test(workingFormula[bracketStart-1]))
         || (workingFormula[bracketStart-1] == ")")) {
            segmentResult = `*${segmentResult}`;
        }
        if ((numberCheck.test(workingFormula[bracketEnd+1]))
         || (workingFormula[bracketEnd+1] == "(")) {
            segmentResult = `${segmentResult}*`;
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
    // POWERS
    // count how many
    let powersCount = 0;
    for (let i = 0; i < workingSegment.length; i++) {
        if (workingSegment[i] == "^") {
            powersCount ++;
        };
    };
    // run the powers function for each
    for (let j = 1; j <= powersCount; j++) {
        let powerResult = calculatePowers(workingSegment);
        workingSegment = 
        `${workingSegment.slice(0, preceder)}${powerResult}${workingSegment.slice(follower+1, workingSegment.length)}`;
    };

    // ROOTS
    // count how many
    let rootsCount = 0;
    for (let i = 0; i < workingSegment.length; i++) {
        if (workingSegment[i] == "√") {
            rootsCount ++;
        };
    };
    // run the roots function for each
    for (let j = 1; j <= rootsCount; j++) {
        let rootsResult = calculateRoots(workingSegment);
        // if a number directly precedes, insert "*"
        if (numberCheck.test(workingSegment[preceder-1])) {
           rootsResult = `*${rootsResult}`;
        }
        workingSegment = 
        `${workingSegment.slice(0, preceder)}${rootsResult}${workingSegment.slice(follower+1, workingSegment.length)}`;
    };

    operators.forEach((operator) => {
        currentCount = 0;
        for (let i = 0; i < workingSegment.length; i++) {
            if (workingSegment[i] == operator) {
                currentCount ++;
            };
        };
        for (let j = 1; j <= currentCount; j++) {
            let basicResult = calculateBasic(workingSegment, operator);
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
    for (let i = operatorIndex-1; i >= 0; i--) {
        if (numberDecimalCheck.test(segment[i])) {
            preceder = i;
        } else {
            break;
        }
    }
    for (let j = operatorIndex+1; j < segment.length; j++) {
        if (numberDecimalCheck.test(segment[j])) {
            follower = j;
        } else {
            break;
        }
    }  
    // run the calculation
    let preNumber = parseFloat(segment.slice(preceder, operatorIndex));
    let postNumber = parseFloat(segment.slice(operatorIndex+1, follower+1));
    switch(operator) {
        case "*":
            return (preNumber * postNumber);
        case "/":
            return (preNumber / postNumber);
        case "+":
            return (preNumber + postNumber);
        case "-":
            return (preNumber - postNumber);
        default:
            return null;
    }
}

const calculatePowers = (segment) => {
    // get the first power in the current segment
    let powerIndex = segment.indexOf("^");
    // get the surrounding numbers
    for (let i = powerIndex-1; i >= 0; i--) {
        if (numberDecimalCheck.test(segment[i])) {
            preceder = i;
        } else {
            break;
        }
    }
    for (let j = powerIndex+1; j < segment.length; j++) {
        if (numberDecimalCheck.test(segment[j])) {
            follower = j;
        } else {
            break;
        }
    }
    // run the calculation
    let preNumber = parseFloat(segment.slice(preceder, powerIndex));
    let postNumber = parseFloat(segment.slice(powerIndex+1, follower+1));
    return Math.pow(preNumber, postNumber);
}

const calculateRoots = (segment) => {
    // get the first root in the current segment
    let rootIndex = segment.indexOf("√");
    // get the following numbers
    for (let i = rootIndex+1; i < segment.length; i++) {
        if (numberDecimalCheck.test(segment[i])) {
            follower = i;
        } else {
            break;
        }
    }
    preceder = rootIndex; // need to update this to slice the result back in
    // run the calculation
    let postNumber = parseFloat(segment.slice(rootIndex+1, follower+1));
    return Math.sqrt(postNumber);
}



