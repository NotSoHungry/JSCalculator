// STATE // 
let equasionArray = [];
let currentNumber = "0";
let previousOperator = null;
let equasionResult = null;

// DOM //
const calculatorControls = document.querySelector('.app-controls');
const calculatorDisplayNumber = document.querySelector('.display-number');
const calculatorDisplayEquasion = document.querySelector('.display-equasion');

// STATE FUNCTIONS // 
const addTypedNumber = function(character) {
  if (currentNumber !== "0") {
    currentNumber += character;
  } else {
    currentNumber = character;
  }
};

const removeTypedNumber = function() {
  if (currentNumber.length > 1) {
    currentNumber = currentNumber.substr(0, currentNumber.length - 1);
  } else {
    currentNumber = "0";
  }
};

const resetTypedNumber = function() {
  currentNumber = "0";
};

const resetCalculator = function() {
  equasionArray = [];
  currentNumber = "0";
  equasionResult = null;
};

const updateCurrentOperator = function(operator) {
  previousOperator = operator;
};

const calculateEquasionResult = function() {
  switch (previousOperator) {
    case "+":
      if (equasionResult !== null) {equasionResult = equasionResult + Number(currentNumber)} 
      else {equasionResult = Number(currentNumber)};
      break;
    case "-":
      if (equasionResult !== null) {equasionResult = equasionResult - Number(currentNumber)}
      else {equasionResult = Number(currentNumber)};
      break;
    case "×":
      if (equasionResult !== null) {equasionResult = equasionResult * Number(currentNumber)}
      else {equasionResult = Number(currentNumber)};
      break;
    case "÷":
      if (equasionResult !== null) {equasionResult = equasionResult / Number(currentNumber)}
      else {equasionResult = Number(currentNumber)};
      break;
    default:
      equasionResult = Number(currentNumber);
  }
};

const updateEquasionArray = function() {
  equasionArray.push(currentNumber);
  equasionArray.push(previousOperator);
};

const finalizeEquasion = function() {
  previousOperator = "";
  currentNumber = String(equasionResult);
  equasionResult = null;
  equasionArray = [];
};

// VIEW FUNCTIONS //

const rerender = function() {
  calculatorDisplayNumber.innerText = currentNumber;
  calculatorDisplayEquasion.innerText = equasionArray.join(' ');
};

// EVENTS //
calculatorControls.addEventListener('click', function(event) {

  const classList = event.target.classList;
  const value = event.target.innerText;
  
  // Add current number
  if (classList.contains('number')) {
    addTypedNumber(value);
  }
  
  // Remove current number
  if (classList.contains('remove')) {
    removeTypedNumber();
  }

  // Reset calculator
  if (classList.contains('cancel')) {
    resetCalculator();
  }

  // Update equasion
  if (classList.contains('operator')) {
    calculateEquasionResult();
    updateCurrentOperator(value);
    updateEquasionArray();
    resetTypedNumber();
  }

  // Finalize equasion
  if (event.target.classList.contains('equals')) {
    calculateEquasionResult();
    finalizeEquasion();
  }

  // Rerender
  rerender();
});
