const displayEl = document.getElementById("display");
const btns = document.querySelectorAll("button:not(.clear-btn, .calculate-btn, .back-btn)");
const calculateBtn = document.querySelector(".calculate-btn");
const clearBtn = document.querySelector(".clear-btn");
const backBtn = document.querySelector(".back-btn");

let eraseOnInput = false;

window.addEventListener("keydown", (e) => {
    const possibleInputs = "0123456789+-*/";
    if (possibleInputs.includes(e.key)) {
        displayEl.value += e.key;
    }

    if (e.key === "Enter") {
        calculateBtn.click();
    }
})

btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        if (eraseOnInput === true) {
            displayEl.value = btn.textContent;
            eraseOnInput = false;
            return;
        }
        displayEl.value += btn.textContent;
    })
})

backBtn.addEventListener("click", () => {
    displayEl.value = displayEl.value.slice(0, -1);
})

calculateBtn.addEventListener("click", () => {
    let regex = /[^0-9]/g;
    let numsArr = displayEl.value.split(regex);
    let operator = displayEl.value.split(/[0-9]/g).join("");
    let num1 = numsArr[0];
    let num2 = numsArr[1];

    console.log(operator, num1, num2);

    const operatorsArr = "+-*/";
    if (operatorsArr.includes(displayEl.value[displayEl.value.length - 1])) {
        console.log("Please finish the calcualtion");
        return;
    }
    const result = operate(operator, num1, num2);
    displayEl.value = result;
    eraseOnInput = true;
})

clearBtn.addEventListener("click", () => {
    displayEl.value = "";
})



function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2; 
}

function operate(operator, num1, num2) { 
    if (operator === "+") {
        return add(num1, num2);
    } else if ( operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        if (num2 === "0") {
            window.alert("Please don't divde by zero...");
        }
        return divide(num1, num2);
    } else {
        window.prompt("Please input a valid expression (E.g. 2*3)");
    }
}
