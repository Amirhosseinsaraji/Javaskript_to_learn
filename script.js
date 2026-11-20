const display = document.querySelector('.calculator-display');
let currentInput = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
const buttons = document.querySelectorAll('section[aria-label="Calculator keypad"] button');
const themeOptions = document.querySelectorAll('input[name="theme"]');

themeOptions.forEach(option => {
    option.addEventListener('change', () => {
        document.body.dataset.theme = option.value;
    });
});
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if ("0123456789".includes(value)) {

            if(waitingForSecondNumber) {
                currentInput = value;
                waitingForSecondNumber = false;
            } else if(currentInput === "0") {
                currentInput = value;
            } else {
                currentInput += value;
            }
            display.textContent = currentInput;
        }
        else if(value === ".") {
            if(waitingForSecondNumber) {
                currentInput = "0.";
                waitingForSecondNumber = false;
            } else if(!currentInput.includes(".")) {
                currentInput += value;
            }
            display.textContent = currentInput;
        }
        else if("+-×/".includes(value)) {
            if(waitingForSecondNumber){
                operator = value;
            }
            else {
                firstNumber=currentInput;
                operator=value;
                waitingForSecondNumber = true;
            }
        }
        else if(value === "DEL") {
            currentInput = currentInput.slice(0, -1);

            if(currentInput === "") {
                currentInput = "0";
            }

            display.textContent = currentInput;
        }
         else if(value === "RESET") {
            currentInput = "0";
            firstNumber = null;
            operator = null;
            waitingForSecondNumber =false;
            display.textContent = currentInput;
        }
    });
});
