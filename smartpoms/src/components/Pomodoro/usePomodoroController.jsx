import { useState, useEffect, useRef } from "react";
import alertsound from "../../assets/sounds/finish.mp3"

const usePomodoroController = () => {

  const [circle, setCircle] = useState(100);
  const [progressTime, setProgressTime] = useState("00:00");
  const [startButtonText, setStartButtonText] = useState("Start");
  const [finish, setFinish] = useState(true);
  const [toggleStart, setToggleStart] = useState(true);
  const timerId = useRef(null);
  const [pomodoroTime, setPomodoroTime] = useState(120);

  useEffect(() => {
    onResetTime();

  }, [])

  function onClickStart() {
    if (finish) {
      onStartPomodoro();
    }

    else {
      if (toggleStart) {
        onResume();
      }
      else {
        onPause();
      }
    }
  }

  function deleteTimer() {
    if(timerId.current) {
      console.log("Timer ELIMINADO! ID="+timerId.current);
      clearInterval(timerId.current);
    }

    else {
      console.log("No existe timer id, id ="+timerId.current);
    }
  }

  function onStartPomodoro() {
    deleteTimer();
    timer();
    setStartButtonText("Pause");
    setToggleStart(false);
    toggleFinish();

  }

  function onPause() {
    deleteTimer();
    setStartButtonText("Resume")
    setToggleStart(true);
  }

  function onResume() {
    deleteTimer();
    timer();
    setStartButtonText("Pause");
    setToggleStart(false);
  }

  function onStopPomodoro() {
    if (!finish) {
      setStartButtonText("Start");
      setToggleStart(true);
      toggleFinish();
      deleteTimer();
      onResetTime();
    }
  }

  function onResetTime() {
    updateProgressBar(0)
    localStorage.setItem("currentTime", 0);
    setProgressTime('00' + ":" + '00');

  }

  function toggleFinish() {
    setFinish(!finish);
  }

  function timer() {
    let tempTimerId = window.setInterval(countSecond, 1000);
    timerId.current = tempTimerId;
    console.log("timer activao! id="+timerId.current);
  }

  function countSecond() {
    let currentTime = localStorage.getItem("currentTime");
    currentTime = parseInt(currentTime);
    if (currentTime >= pomodoroTime) {
      
      setStartButtonText("Start");
      setToggleStart(true);
      toggleFinish();
      onResetTime();
      deleteTimer();

      
      playSoundFinish();
      console.log("pomodoro acabao!");
    }

    else {
      currentTime = currentTime + 1;
      let setProgressPercent = (currentTime / pomodoroTime * 100);

      let secondsLeft = pomodoroTime - currentTime;
      let minutes = Math.floor(secondsLeft / 60);
      let seconds = secondsLeft - minutes * 60;
      if (seconds <= 9) {
        seconds = "0" + seconds;
      }

      if (minutes <= 9) {
        minutes = "0" + minutes;
      }
      setProgressTime(minutes + ":" + seconds)
      document.title = minutes + ":" + seconds;
      updateProgressBar(setProgressPercent)
      localStorage.setItem("currentTime", currentTime);
    }
  }

  function updateProgressBar(value) {
    setCircle(value);
  }

  function playSoundFinish() {
    let audio = new Audio(alertsound);
    audio.play();
    

  }

  return {
    startText: startButtonText,
    onStartPomodoro: onClickStart,
    onStopPomodoro: onStopPomodoro,
    onResetTime: onResetTime,
    circle: circle,
    progressTime: progressTime

  };
};

export default usePomodoroController;