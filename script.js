const display = document.querySelector('.calculator-display');
let currentInput = "0";
const buttons = document.querySelectorAll('section[aria-label="Calculator keypad"] button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if ("0123456789".includes(value)) {
            if(currentInput === "0") {
                currentInput = value;
            } else {
                currentInput += value;
                
            }

            display.textContent = currentInput;
        }
        else if(value === ".") {
            if(!currentInput.includes(".")) {
                currentInput += value;
            }
            display.textContent = currentInput;
        }
        
    });
});
