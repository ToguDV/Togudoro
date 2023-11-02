export default () => {
    let currentTime = 0;
    let pomodoroTime = 0;
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;
        let { auxCurrentTime, pomodoroTimeAux } = e.data;
        currentTime = auxCurrentTime;
        pomodoroTime = pomodoroTimeAux;
        console.log("currentTime:"+auxCurrentTime);
        console.log("Pomodoro:"+pomodoroTime);
        let tempTimerId = setInterval(countSecond, 1000);
        
    });

    function countSecond() {
        
        console.log("worker second");
        if (currentTime >= pomodoroTime) {
          
        }
    
        else {
          currentTime = (currentTime + 1);
          console.log(currentTime);
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
          postMessage({minutes:minutes, seconds:seconds, setProgressPercent:setProgressPercent});
          console.log("mensaje posteao");
        }
      }
  }