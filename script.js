const display = document.querySelector('.calculator-display');
let currentInput = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
const buttons = document.querySelectorAll('section[aria-label="Calculator keypad"] button');
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
        else if(value === "=") {
    if(firstNumber !== null && operator !== null) {
        const first = Number(firstNumber);
        const second = Number(currentInput);
        let result;

        if(operator === "+") {
            result = first + second;
        }
        else if(operator === "-") {
            result = first - second;
        }
        else if(operator === "×") {
            result = first * second;
        }
        else if(operator === "/") {
            result = first / second;
        }

        currentInput = String(result);
        display.textContent = currentInput;

        firstNumber = currentInput;
        operator = null;
        waitingForSecondNumber = true;
    }
}
    });
});
document.addEventListener('keydown', (event) => {
    const keyMap = {
        '*': '×',
        'Enter': '=',
        'Backspace': 'DEL',
        'Escape': 'RESET'
    };

    const buttonValue = keyMap[event.key] || event.key;

    const matchingButton = Array.from(buttons).find(button => {
        return button.textContent.trim() === buttonValue;
    });

    if (matchingButton) {
        event.preventDefault();
        matchingButton.click();
    }
});