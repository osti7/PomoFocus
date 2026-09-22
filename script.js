const SSbutton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const frame = document.getElementById("frame");
const timer = document.getElementById("timer");
const mode = document.getElementById("mode");
const themeButton = document.getElementById("themeButton");
const muteButton = document.getElementById("muteButton");
const themeText = document.getElementById("themeText");
const muteText = document.getElementById("muteText");
const themeImage = document.getElementById("themeImage");
const muteImage = document.getElementById("muteImage");
const body = document.getElementById("body");
const completed = new Audio("completed.mp3");
const started = new Audio("started.mp3");
const finished = new Audio("finished.mp3");
const reseted = new Audio("reseted.ogg");

let workingMinute = 25;
let workingTime = workingMinute * 60 - 1;
let breakMinute = 5;
let breakTime = breakMinute * 60 - 1;
let workingTimer = null;
let breakingTimer = null;
let running = false;
let darkTheme = true;
let mute = false;

function startStop(){
    if(SSbutton.innerHTML == "Stop"){
        running = false;

        SSbutton.innerHTML = "Start";
        SSbutton.style.backgroundColor = "#4500ff";
        SSbutton.disabled = false;

        frame.style.borderColor = "#4500ff";
        frame.style.boxShadow = "0px 0px 50px #4500ff inset, 0px 0px 100px #4500ff";

        if(darkTheme == true){
            timer.style.color = "white";
        }
    
        else{
            timer.style.color = "black";
        }

        if(mute == false){
            finished.play();
        }

        clearInterval(workingTimer);
    }

    else{
        running = true;

        SSbutton.innerHTML = "Stop";
        SSbutton.style.backgroundColor = "#000";
        SSbutton.disabled = false;
        
        frame.style.borderColor = "#777";
        frame.style.boxShadow = "none";

        timer.style.color = "#777";

        if(mute == false){
            started.play();
        }

        clearInterval(breakingTimer);
        workingTimer = setInterval(timing, 1000);
    }
}

function reset(){
    clearInterval(workingTimer);
    clearInterval(breakingTimer);

    workingMinute = 25;
    breakMinute = 5;
    workingTime = workingMinute * 60 - 1;
    breakTime = breakMinute * 60 - 1;
    running = false;
    timer.innerHTML = workingMinute + ".00";

    SSbutton.innerHTML = "Start";
    SSbutton.style.backgroundColor = "#4500ff";
    SSbutton.style.borderColor = "#4500ff";
    SSbutton.disabled = false;

    frame.style.borderColor = "#4500ff";
    frame.style.boxShadow = "0px 0px 50px #4500ff inset, 0px 0px 100px #4500ff";

    if(darkTheme == true){
        timer.style.color = "white";
    }

    else{
        timer.style.color = "black";
    }

    mode.innerHTML = "FOCUS";
    mode.style.color = "#4500ff"

    if(mute == false){
        reseted.play();
    }
}

function timing(){
    if(workingTime >= 0){
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
        frame.style.boxShadow = "0px 0px 50px #4500ff inset, 0px 0px 100px #4500ff";

        timer.style.color = "#fff";

        if(mute == false){
            completed.play();
        }

        clearInterval(workingTimer);
        breakingTimer = setInterval(breaking, 1000);
        breaking();
    }
}

function breaking(){
    running = false;
    
    SSbutton.innerHTML = "Start";
    SSbutton.style.backgroundColor = "#aaff00";
    SSbutton.style.borderColor = "#aaff00";
    SSbutton.disabled = true;

    frame.style.borderColor = "#aaff00";
    frame.style.boxShadow = "0px 0px 50px #aaff00 inset, 0px 0px 100px #aaff00";

    if(darkTheme == true){
        timer.style.color = "white";
    }

    else{
        timer.style.color = "black";
    }

    mode.innerHTML = "BREAK";
    mode.style.color = "#aaff00";


    if(breakTime >= 0){
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

function changeTheme(){
    if(running == false && darkTheme == true){
        darkTheme = false;
        body.style.backgroundColor = "white";
        timer.style.color = "black";
        resetButton.style.color = "black";
        themeButton.style.borderColor = "black";
        muteButton.style.borderColor = "black";
        themeText.style.color = "black";
        muteText.style.color = "black";
    }

    else if(running == false && darkTheme == false){
        darkTheme = true;
        body.style.backgroundColor = "black";
        timer.style.color = "white";
        resetButton.style.color = "white";
        themeButton.style.borderColor = "white";
        muteButton.style.borderColor = "white";
        themeText.style.color = "white";
        muteText.style.color = "white";
    }   
}

function changeSound(){
    if(mute == false){
        mute = true;
        muteText.innerHTML = "Unmute";
        muteImage.src = "mute.svg";
    }
    else{
        mute = false;
        muteText.innerHTML = "Mute";
        muteImage.src = "unmute.svg";
    }
}

document.addEventListener("keydown", (e) => {
    if(e.code === "KeyR"){
        reset();
    }

    else if(e.code === "Space"){
        if(running == true){
            running = false;

            SSbutton.innerHTML = "Start";
            SSbutton.style.backgroundColor = "#4500ff";
            SSbutton.disabled = false;
    
            frame.style.borderColor = "#4500ff";
            frame.style.boxShadow = "0px 0px 50px #4500ff inset, 0px 0px 100px #4500ff";
    
            if(darkTheme == true){
                timer.style.color = "white";
            }
        
            else{
                timer.style.color = "black";
            }
    
            if(mute == false){
                finished.play();
            }
    
            clearInterval(workingTimer);
        }

        else{
            running = true;

            SSbutton.innerHTML = "Stop";
            SSbutton.style.backgroundColor = "#000";
            SSbutton.disabled = false;
            
            frame.style.borderColor = "#777";
            frame.style.boxShadow = "none";
    
            timer.style.color = "#777";
    
            if(mute == false){
                started.play();
            }
    
            clearInterval(breakingTimer);
            workingTimer = setInterval(timing, 1000);
        }
    }
})