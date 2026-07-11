// =========================
// Elements
// =========================

const expression = document.getElementById("expression");
const result = document.getElementById("result");

const buttons = document.querySelectorAll(".buttons button");

const themeBtn = document.getElementById("themeBtn");

const clock = document.getElementById("clock");

let currentExpression = "";

// =========================
// Update Display
// =========================

function updateDisplay(){

    expression.textContent = currentExpression || "0";

}

// =========================
// Calculate
// =========================

function calculate(){

    if(currentExpression==="") return;

    try{

        let exp = currentExpression
        .replace(/×/g,"*")
        .replace(/÷/g,"/")
        .replace(/−/g,"-");

        const answer = Function('"use strict"; return ('+exp+')')();

        result.textContent = answer;

        expression.textContent = currentExpression + " =";

        currentExpression = answer.toString();

    }

    catch{

        result.textContent = "Error";

        currentExpression="";

        expression.textContent="0";

    }

}

// =========================
// Button Click
// =========================

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        const value = button.textContent;

        switch(value){

            case "AC":

                currentExpression="";

                expression.textContent="0";

                result.textContent="0";

                break;

            case "DEL":

                currentExpression=currentExpression.slice(0,-1);

                updateDisplay();

                break;

            case "=":

                calculate();

                break;

            default:

                currentExpression+=value;

                updateDisplay();

        }

    });

});

// =========================
// Keyboard Support
// =========================

document.addEventListener("keydown",(e)=>{

    const key=e.key;

    // Numbers

    if(!isNaN(key)){

        currentExpression+=key;

        updateDisplay();

        return;

    }

    // Operators

    if(["+","-","*","/","%","."].includes(key)){

        currentExpression+=key;

        updateDisplay();

        return;

    }

    // Enter

    if(key==="Enter"){

        e.preventDefault();

        calculate();

        return;

    }

    // Delete

    if(key==="Backspace"){

        currentExpression=currentExpression.slice(0,-1);

        updateDisplay();

        return;

    }

    // Clear

    if(key==="Escape"){

        currentExpression="";

        expression.textContent="0";

        result.textContent="0";

    }

});

// =========================
// Theme
// =========================

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

    themeBtn.textContent="☀️";

}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.textContent="☀️";

        localStorage.setItem("theme","dark");

    }

    else{

        themeBtn.textContent="🌙";

        localStorage.setItem("theme","light");

    }

});

// =========================
// Live Clock
// =========================

function updateClock(){

    const now=new Date();

    let h=now.getHours();

    let m=now.getMinutes();

    const ampm=h>=12?"PM":"AM";

    h=h%12;

    h=h?h:12;

    m=m<10?"0"+m:m;

    clock.textContent=`${h}:${m} ${ampm}`;

}

updateClock();

setInterval(updateClock,1000);