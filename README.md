# calculator_web_app
## Calculator app in Javascript, with HTML / CSS interface
-----------------------------------------------------------------------------------------------
This is a simple calculator app, written in JavaScript, with a GUI written in HTML and CSS.<br>
It should perform basic calculations.<br>
It should be formatted for mobile and desktop layouts.<br>

-----------------------------------------------------------------------------------------------
### Initial Design sketch
![sketch](https://i.imgur.com/qNUewL5.png)<br>
### HTML
The HTML will be quite simple, with 2 main sections: the display and the button-pad.<br>
The display should have two containers, one for the current formula, and one for the result of the last calulation.<br>
Each button will need a distinct class, as each will signal something different to the display.<br>
### CSS
The main body should be a flex-box, in a column direction.<br>
The containers for the display and the button-pad should have background colours, and rounded corners.<br>
The button-pad should be in a grid display. The buttons should have 2 or three colours, to distinguish between the numbers vs the functions.<br>
Each button should sit in a container, such that they can have a circle/box around them.<br>
The buttons should give visual feedback when hovered over and when clicked/tapped.<br>
It would be good to have a dark-mode/light-mode colour scheme.<br>

-----------------------------------------------------------------------------------------------
### JS PsuedoCode
<pre>
function: addToDisplay = (input from button) => {
  adds the corresponding symbol from the button, to the display;
  if (bracket) {
    count if a bracket has been opened: if so, close it;
  }
}

function: removeFromDisplay = () => {
  remove last symbol from the display;
}

function: clearDisplay = () => {
  clears the display;
}

function: runCalculation = () => {
  take the formula currently being displayed, and calculate it;
  if (formula ends in symbol (+/-/etc) {
    don't run;
  }
  if (there is an open bracket) {
    append a closing bracket before calculation;
  }
  display the result of the calculation;
  (as soon as the user starts pressing buttons again, keep a save of the result in the other container in the display);
}
</pre>

-----------------------------------------------------------------------------------------------
### Caclulation PsuedoCode
<pre>
function: overallCalculation = (formula) => {
  //first need to pull out any bracket pairs
  simplifiedFunction = bracketPairs(formula);
  // bracketPairs will calculate and replace bracket segments sequentially, resulting in a simplified calculation
  runCalculation(simplifiedFunction);
}

function: bracketPairs = (formula) => {
  find the index of the last "(";
  find the index of the following ")";
  segment = formula.slice(the segment between this bracket pair);
  runCalculation(segment);
  return answer, replace the segment with that answer;
  (if there is a number directly preceeding/following the segment, need to insert/append "*")
}

function: runCalculation(formula) => {
  //indices
  find any "√";
  find whichever non-digit symbol follows it;
  pull out the number between, and square-root that number;
  replace that result into the formula;
  
  find any "^";
  find whichever non-digit symbol preceeds it;
  find whichever non-digit symbol follows it;
  pull out the numbers, run preceeding number to the power of following number;
  replace that result into the formula;
  
  //multiply + divide
  // at this point, the formula should be clear of advanced symbols
  find any "*";
  run calculations similarly to previous steps;
  repeat for divide, then for add, then subtract
  //add + subtract
  
  return the result of the calculation
}
</pre>

![sketch](https://i.imgur.com/1rj7Qtz.jpg)<br>
