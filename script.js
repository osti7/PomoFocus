const SSbutton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const frame = document.getElementById("frame");
const timer = document.getElementById("timer");
const mode = document.getElementById("mode");
const completed = new Audio("completed.mp3");
const started = new Audio("started.mp3");
const finished = new Audio("finished.mp3");
const reseted = new Audio("reseted.ogg");

let workingMinute = 25;
let workingTime = workingMinute * 60 - 1;
let breakMinute = 5;
let breakTime = breakMinute * 60 - 1;
let running = false;
let workingTimer = null;
let breakingTimer = null;

function startStop(){
    if(SSbutton.innerHTML == "Stop"){
        running = false;

        SSbutton.innerHTML = "Start";
        SSbutton.style.backgroundColor = "#4500ff";
        SSbutton.disabled = false;

        resetButton.style.backgroundColor = "transparent";
        resetButton.disabled = false;

        frame.style.borderColor = "#4500ff";
        frame.style.boxShadow = "0px 0px 25px #4500ff inset, 0px 0px 50px #4500ff";

        timer.style.color = "#fff";

        finished.play();

        clearInterval(workingTimer);
    }

    else{
        running = true;

        SSbutton.innerHTML = "Stop";
        SSbutton.style.backgroundColor = "#000";
        SSbutton.disabled = false;

        resetButton.style.backgroundColor = "#777";
        resetButton.disabled = true;
        
        frame.style.borderColor = "#777";
        frame.style.boxShadow = "none";

        timer.style.color = "#777";

        started.play();

        clearInterval(breakingTimer);
        workingTimer = setInterval(timing, 1000);
    }
}

function reset(){
    running = false;
    workingMinute = 25;
    breakMinute = 5;
    workingTime = workingMinute * 60 - 1;
    breakTime = breakMinute * 60 - 1;
    timer.innerHTML = workingMinute + ".00";

    SSbutton.innerHTML = "Start";
    SSbutton.style.backgroundColor = "#4500ff";
    SSbutton.style.borderColor = "#4500ff";
    SSbutton.disabled = false;

    resetButton.style.backgroundColor = "transparent";
    resetButton.disabled = false;

    frame.style.borderColor = "#4500ff";
    frame.style.boxShadow = "0px 0px 25px #4500ff inset, 0px 0px 50px #4500ff";

    timer.style.color = "#fff";

    mode.innerHTML = "FOCUS";
    mode.style.color = "#4500ff"

    reseted.play();
}

function timing(){
    if(workingTime >= 0 && running == true){
        const minute = Math.floor(workingTime / 60);
        let second = workingTime % 60;
    
        second = second < 10 ? "0" + second : second;
        
        timer.innerHTML = minute + "." + second;
        workingTime--;
    }

    if(workingTime == 0){
        SSbutton.innerHTML = "Start";
        SSbutton.style.backgroundColor = "#777";
        SSbutton.disabled = true;
        SSbutton.style.boxShadow = "none";

        frame.style.borderColor = "#4500ff";
        frame.style.boxShadow = "0px 0px 25px #4500ff inset, 0px 0px 50px #4500ff";

        timer.style.color = "#fff";

        completed.play();

        clearInterval(workingTimer);
        breakingTimer = setInterval(breaking, 1000);
        breaking();
    }
}

function breaking(){
    SSbutton.innerHTML = "Start";
    SSbutton.style.backgroundColor = "#aaff00";
    SSbutton.style.borderColor = "#aaff00";
    SSbutton.disabled = true;

    frame.style.borderColor = "#aaff00";
    frame.style.boxShadow = "0px 0px 25px #aaff00 inset, 0px 0px 50px #aaff00";

    timer.style.color = "#fff";

    mode.innerHTML = "BREAK";
    mode.style.color = "#aaff00"


    if(breakTime >= 0 /*&& running == true*/){
        const bMinute = Math.floor(breakTime / 60);
        let bSecond = breakTime % 60;
    
        bSecond = bSecond < 10 ? "0" + bSecond : bSecond;
        
        timer.innerHTML = bMinute + "." + bSecond;
        breakTime--;
    }

    if(breakTime == 0){
        clearInterval(breakingTimer);
        reset();
    }
}