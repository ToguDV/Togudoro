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

  const [pomodoroTime, setPomodoroTime] = useState(getPomodoroTime());
  const [pomReason, setPomReason] = useState("Work");
  const pomCount = useRef(0);

  const currentTime = useRef(0);
  const webWorker = useRef(null);
  const [audio, setaudio] = useState(new Audio(alertsound));

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
    currentTime.current = 0;
    let secondsLeft = pomodoroTime - currentTime.current;
    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft - minutes * 60;
    document.title = minutes + ":" + seconds;
    if (seconds <= 9) {
      seconds = "0" + seconds;
    }

    if (minutes <= 9) {
      minutes = "0" + minutes;
    }

    setProgressTime(minutes + ":" + seconds);
    document.title = (minutes + ":" + seconds) + " Togudoro";

  }

  function toggleFinish() {
    setFinish(!finish);
  }

  function timer() {
    let secondsLeft = pomodoroTime - currentTime.current;
    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft - minutes * 60;
    document.title = minutes + ":" + seconds;
    if (seconds <= 9) {
      seconds = "0" + seconds;
    }

    if (minutes <= 9) {
      minutes = "0" + minutes;
    }

    setProgressTime(minutes + ":" + seconds);
    document.title = (minutes + ":" + seconds) + " Togudoro";
    let setProgressPercent = (currentTime.current / pomodoroTime * 100);
    updateProgressBar(setProgressPercent)

    webWorker.current = new WebWorker(worker);
    let auxCurrentTime = currentTime.current;
    webWorker.current.postMessage({ auxCurrentTime: auxCurrentTime, pomodoroTimeAux: pomodoroTime });

    webWorker.current.addEventListener('message', (e) => {
      if (!e) return;
      if (e.data === "stop") {
        audio.play();
        onFinish();
      }

      else {
        const { minutes, seconds, setProgressPercent } = e.data;
        currentTime.current = currentTime.current + 1;
        setProgressTime(minutes + ":" + seconds);
        document.title = (minutes + ":" + seconds) + " Togudoro";
        updateProgressBar(setProgressPercent)
      }

    });
  }

  function onFinish() {

    calcReason();
    setStartButtonText("Start");
    setToggleStart(true);
    toggleFinish();
    onResetTime();
    deleteTimer();
  }

  function updateProgressBar(value) {
    setCircle(value);
  }

  function onBtnWork() {
    setPomReason("Work");
    onStopPomodoro();
  }

  function onBtnRest() {
    setPomReason("Rest");
    onStopPomodoro();
  }

  function onBtnLongRest() {
    setPomReason("Long Rest");
    onStopPomodoro();
  }

  function getPomodoroTime() {
    return localStorage.getItem("minWork");
  }

  function updatePomodoroTime() {
    setPomodoroTime(getPomodoroTime());
  }

  function calcReason() {
    if (pomReason === "Rest" || pomReason === "Long Rest") {
      if(pomReason === "Long Rest") pomCount.current = 0;
      setPomReason("Work");
    }

    else {
      pomCount.current = pomCount.current + 1;
      if (pomCount.current < 3) {
        setPomReason("Rest");
      }

      else {
        setPomReason("Long Rest");
      }
    }
  }




  return {
    startText: startButtonText,
    onStartPomodoro: onClickStart,
    onStopPomodoro: onStopPomodoro,
    onResetTime: onResetTime,
    circle: circle,
    progressTime: progressTime,
    pomReason: pomReason,
    onBtnWork: onBtnWork,
    onBtnRest: onBtnRest,
    onBtnLongRest: onBtnLongRest,
    updatePomodoroTime: updatePomodoroTime

  };
};

export default usePomodoroController;