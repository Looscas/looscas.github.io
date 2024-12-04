const inputField = document.getElementById("inputField");
const clearBtn = document.getElementById("clearBtn");
const backspaceBtn = document.getElementById("backspaceBtn");
const calculateBtn = document.getElementById("calculateBtn");
let freeToEnter = true;

clearBtn.addEventListener("click", clear);
backspaceBtn.addEventListener("click", backspace);
calculateBtn.addEventListener("click", calculate);

function addCharacter(char) {
    if(!freeToEnter || inputField.value <= 0)
    {
        clear();
        inputField.value += char;
    } else {
        if (inputField.value.length < inputField.maxLength) {
            inputField.value += char;
        } else {
            throwError();
        }
    }
}

function clear() {
    inputField.value = "";
    inputField.style.color = "#4dd906";
    freeToEnter = true;
}

function backspace() {
    if(inputField.value === "Error"){
        clear();
    } else {
        inputField.value = inputField.value.slice(0, -1);
    }
}

function calculate() {
    try {
        inputField.value = eval(inputField.value);
    } catch (erro)
    {
        throwError();
    }
}

function throwError(){
    inputField.value = "Error";
    inputField.style.color = "red";
    freeToEnter = false;
}