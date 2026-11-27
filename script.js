const display = document.querySelector(".calculator-display");
let currentInput = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
function calculate(firstNumber, operator, secondNumber) {
  const first = Number(firstNumber);
  const second = Number(secondNumber);
  switch (operator) {
    case "+":
      return first + second;

    case "-":
      return first - second;

    case "×":
      return first * second;

    case "/":
      if (second === 0) {
        return "Error"
      }
      else{
      return first / second;
      }
    default:
      return null;
  }
}

const buttons = document.querySelectorAll(
  'section[aria-label="Calculator keypad"] button',
);
const themeOptions = document.querySelectorAll('input[name="theme"]');
const savedTheme = localStorage.getItem("theme");
const validThemes = ["1", "2", "3"];
const initialTheme = validThemes.includes(savedTheme)
  ? savedTheme
  : window.matchMedia("(prefers-color-scheme: light)").matches ? "2" : "1";
document.body.dataset.theme = initialTheme;
themeOptions.forEach((option) => {
  option.checked = option.value === initialTheme;
  option.addEventListener("change", () => {
    document.body.dataset.theme = option.value;
    localStorage.setItem("theme", option.value);
  });
});
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    if ("0123456789".includes(value)) {
      if (waitingForSecondNumber) {
        currentInput = value;
        waitingForSecondNumber = false;
      } else if (currentInput === "0" || currentInput === "Error") {
        currentInput = value;
      } else {
        currentInput += value;
      }
      display.textContent = currentInput;
    } else if (value === ".") {
      if (waitingForSecondNumber || currentInput === "Error") {
        currentInput = "0.";
        waitingForSecondNumber = false;
      } else if (!currentInput.includes(".")) {
        currentInput += value;
      }
      display.textContent = currentInput;
    } else if ("+-×/".includes(value)) {
      if (currentInput === "Error") {
        return;
      }
      if (waitingForSecondNumber) {
        operator = value;
      } else {
        firstNumber = currentInput;
        operator = value;
        waitingForSecondNumber = true;
      }
    } else if (value === "DEL") {
      currentInput = currentInput === "Error" ? "0" : currentInput.slice(0, -1);

      if (currentInput === "") {
        currentInput = "0";
      }

      display.textContent = currentInput;
    } else if (value === "RESET") {
      currentInput = "0";
      firstNumber = null;
      operator = null;
      waitingForSecondNumber = false;
      display.textContent = currentInput;
    }



    else if (value ==="="){
      if (firstNumber === null || operator ===null ){
        return}
        else{
          const result = calculate(firstNumber, operator, currentInput)
          if(result !== null){
            currentInput = typeof result === "number"
              ? (Number.isFinite(result) ? String(Number(result.toPrecision(10))) : "Error")
              : String(result);
            display.textContent = currentInput;
            firstNumber = null;
            operator = null;
            waitingForSecondNumber = currentInput.includes("e");
          }
        }
    }
  });
});
