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

