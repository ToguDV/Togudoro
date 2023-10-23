let circle = document.getElementById("pom-circle");
let percentage = document.getElementById("percentage");
let start = document.getElementById("start");
let stop_ = document.getElementById("stop");
let timerId;
localStorage.setItem("pomodoroTime", 5);
let pomodoroTime = localStorage.getItem("pomodoroTime");
let secondsLeft;
let toggleStart = true;
let finish = true;
let title_ = "Pomodoro terminado";
let body_ = 'Descansa un momento!';
let favicon_ = 'other';
resetCounter();

import { Notify } from "./notify.js";
const notify = new Notify(title_, body_, favicon_);



function onStartPomodoro() {
    if (finish) {
        countSecond();
        clearInterval(timerId)
        timer();
        start.innerHTML = "Pause";
        toggleStart = false;
        toggleFinish();
    }

    else {
        //Resume/Start
        if (toggleStart) {
            countSecond();
            clearInterval(timerId)
            timer();
            start.innerHTML = "Pause";
            toggleStart = false;
        }

        //Pause
        else {
            clearInterval(timerId)
            start.innerHTML = "Resume";
            toggleStart = true;
        }

    }


}

function toggleFinish() {
    finish = !finish;
}

function timer() {
    timerId = setInterval(countSecond, 1000);
}


function countSecond() {
    let currentTime = localStorage.getItem("currentTime");
    currentTime = parseInt(currentTime);
    if (currentTime >= pomodoroTime) {
        toggleFinish();
        start.innerHTML = "Start";
        clearInterval(timerId);
        resetCounter();
        playFinish();

    }

    else {
        currentTime = currentTime + 1;
        let progressPercent = currentTime / pomodoroTime * 100;

        secondsLeft = pomodoroTime - currentTime;
        let minutes = Math.floor(secondsLeft / 60);
        let seconds = secondsLeft - minutes * 60;
        if (seconds <= 9) {
            seconds = "0" + seconds;
        }

        if (minutes <= 9) {
            minutes = "0" + minutes;
        }
        document.title = minutes + ":" + seconds;
        percentage.innerHTML = minutes + ":" + seconds;
        updateProgressPercent(progressPercent)
        localStorage.setItem("currentTime", currentTime);
    }
}


function onStopPomodoro() {
    if (!finish) {
        start.innerHTML = "Start";
        toggleStart = true;
        toggleFinish();
        clearInterval(timerId);
        resetCounter();
    }

}

function updateProgressPercent(value) {
    circle.setAttribute("stroke-dasharray", value + ", 100");
}

function resetCounter() {
    updateProgressPercent(100)
    localStorage.setItem("currentTime", 0);
    percentage.innerHTML = '00' + ":" + '00';

}

function playFinish() {
    let audio = new Audio('../sounds/finish.mp3')
    audio.play();
    notify.show();

}



start.onclick = function () { onStartPomodoro() };
stop_.onclick = function () { onStopPomodoro() };