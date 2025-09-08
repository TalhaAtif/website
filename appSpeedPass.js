const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
/** @type {HTMLSpanElement} */
const input = document.querySelector(".textEdit");
/** @type {HTMLDivElement} */
const textDiv = document.getElementById("mainInputBox");
/** @type {HTMLInputElement} */
const setPass = document.getElementById("setPassword");
/** @type {HTMLButtonElement} */
const hidePass = document.getElementById("hideShow");

const placeholder = "Click here to start..."
let password = "sample";

input.style.minWidth = textDiv.offsetWidth - 4 * fontSize + 'px';

let currentTyped = "";
let timer = null;
let time = 0;

/** @type {HTMLSpanElement} */
const timerBox = document.getElementById("timerVisual");

setPass.addEventListener('input', () => {
    password = setPass.value;
})
input.addEventListener('focus', () => {

    if (input.textContent === placeholder) {
        input.textContent = '';
        input.style.fontSize = 2 + 'rem';
    }
})

input.addEventListener('blur', () => {
    if (input.textContent.trim() === '') {
        input.style.fontSize = 1 + 'rem';
        input.textContent = "Click here to start...";
        input.style.color = 'white';

        timerMode(false);
        time = 0;
        timerBox.textContent = "";

    }
})

document.addEventListener("keydown", (pressed) => {
    if (pressed.key === "Tab") {
        pressed.preventDefault();
        resetInput();
        timerMode(false);
        time = 0;
        timerBox.textContent = "";
    }
})

input.addEventListener('input', () => {

    if (input.textContent.trim() === '') {
        time = 0;
        timerMode(false);
    }
    else {
        timerMode(true);
        /*Changes stuff in the span to dots */
        const inputDisplay = input.textContent;

        /* Save real input */
        if (currentTyped.length < inputDisplay.length) {
            currentTyped += inputDisplay[inputDisplay.length - 1];
        }
        else if (currentTyped.length > inputDisplay.length) {
            currentTyped = currentTyped.slice(0, inputDisplay.length);
        }


        input.textContent = "•".repeat(input.textContent.length);
        input.style.color = 'rgba(244, 240, 0, 1)';
        if (currentTyped.slice(0, currentTyped.length) !== password.slice(0, currentTyped.length)) {
            input.style.color = 'red';
        }
        if (currentTyped === password) {
            timerMode(false);
            input.style.color = 'rgb(0,255,0)';
        }

        /* Cursor Positioning Section */
        const range = document.createRange();
        const selected = window.getSelection();

        range.selectNodeContents(input);
        range.collapse(false);

        selected.removeAllRanges();
        selected.addRange(range);
    }
})

function timerMode(on) {
    if (on) {
        if (timer) return;
        time = 0;
        timer = setInterval(() => {
            time++;
            let numberVal = (time / 100).toFixed(2);
            timerBox.textContent = numberVal;
        }, 10);
    }
    else {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }
}

function resetInput() {
    input.textContent = "";
    currentTyped = "";
}

function settings() {
    var menu = document.getElementById("mySettings");
    menu.classList.toggle("show");
}

function togglePass() {
    setPass.type = setPass.type === "password" ? "text" : "password";
    hidePass.textContent = hidePass.textContent === "Hide" ? "Show" : "Hide";

}