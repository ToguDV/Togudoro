let circle = document.getElementById("pom-circle");  
let percentage = document.getElementById("percentage");
let start = document.getElementById("start");
let stop_ = document.getElementById("stop");
localStorage.setItem("pomodoroTime", 60);
let timerId;
let pomodoroTime = localStorage.getItem("pomodoroTime");
let secondsLeft;
let toggleStart = true;
let finish = false;
resetCounter();
let title;
let body;
let favicon;


if('Notification' in window === true) {
    Notification.requestPermission();
    title = "Pomodoro terminado";
    body = 'Descansa un momento!';
    favicon = 'other';
    
}



function onStartPomodoro() {
    if(finish) {
        countSecond();
        clearInterval(timerId)
        timer();
        start.innerHTML = "Pause";
        toggleStart = false;
        finish = false;
    }
    
    else {
        //Resume/Start
    if(toggleStart) {
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

function timer() {
    timerId = setInterval(countSecond, 1000);
}


function countSecond() {
    currentTime = localStorage.getItem("currentTime");
    currentTime = parseInt(currentTime);
    if(currentTime >= pomodoroTime) {
        finish = true;
        start.innerHTML = "Start";
        clearInterval(timerId);
        resetCounter();
        playFinish();
        
    }

    else {
        currentTime = currentTime + 1;
        progressPercent = currentTime/pomodoroTime*100;

        secondsLeft = pomodoroTime - currentTime;
        var minutes = Math.floor(secondsLeft/ 60);
        var seconds = secondsLeft - minutes * 60;
        if(seconds <=9 ) {
            seconds = "0"+seconds;
        }

        if(minutes <=9 ) {
            minutes = "0"+minutes;
        }
        document.title = minutes +":"+ seconds;
        percentage.innerHTML = minutes +":"+ seconds;
        updateProgressPercent(progressPercent)
        localStorage.setItem("currentTime", currentTime);
    }
}


function onStopPomodoro() {
    start.innerHTML = "Start";
    toggleStart = true;
    finish = false
    clearInterval(timerId)
    resetCounter();
}

function onPausePomodoro(){

}

function onResumePomodoro() {

}

function updateProgressPercent(value) {
    circle.setAttribute("stroke-dasharray", value+", 100");
}

function resetCounter() {
    updateProgressPercent(100)
    localStorage.setItem("currentTime", 0);
    percentage.innerHTML = '00'+":"+'00';
    
}

function playFinish() {
    var audio = new Audio('../sounds/finish.mp3')
    audio.play();
    let noti = new Notification(title, {body , favicon});
  }



start.onclick = function() {onStartPomodoro()};
stop_.onclick = function() {onStopPomodoro()};