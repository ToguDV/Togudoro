import { useState, useEffect, useRef } from "react";
import alertsound from "../../assets/sounds/finish.mp3"
import worker from './app.worker.js';
import WebWorker from '../../utils/WebWorker.js';

const usePomodoroController = () => {

  const [circle, setCircle] = useState(100);
  const [progressTime, setProgressTime] = useState("00:00");
  const [startButtonText, setStartButtonText] = useState("Start");
  const [finish, setFinish] = useState(true);
  const [toggleStart, setToggleStart] = useState(true);
  const [pomodoroTime, setPomodoroTime] = useState(900);
  const [pomReason, setPomReason] = useState("Work");
  const webWorker = useRef(null); 

  useEffect(() => {
    onResetTime();

  }, []);

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
    if (webWorker.current) {
      webWorker.current.terminate();
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
    countSecond();
    webWorker.current = new WebWorker(worker);
    webWorker.current.postMessage("start");

    webWorker.current.addEventListener('message', (event) => {

      countSecond();

    });
  }

  function onFinish() {
    let notification = new Notify("Hola", "test", "xd");

    setStartButtonText("Start");
    setToggleStart(true);
    toggleFinish();
    onResetTime();
    deleteTimer();
    playSoundFinish();
  }

  function countSecond() {
    let currentTime = localStorage.getItem("currentTime");
    currentTime = parseInt(currentTime);
    if (currentTime >= pomodoroTime) {
      onFinish();
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
    progressTime: progressTime,
    pomReason: pomReason

  };
};

export default usePomodoroController;