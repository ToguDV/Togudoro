export default () => {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;
        const { currenTime, pomodoroTime } = e.data;
        let tempTimerId = setInterval(countSecond(currenTime, pomodoroTime), 1000);
        
    })

    function countSecond(currentTime, pomodoroTime) {
        if (currentTime >= pomodoroTime) {
          onFinish();
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
          postMessage({minutes:minutes, seconds:seconds});
        }
      }
  }