import React from 'react'

const useTimeCalculator = () => {

  function calculateTime (pomReason) {
    let pomDuration = new Number(localStorage.getItem('pomDuration'));
    let difficult = new Number(localStorage.getItem("difficult"));
    let minWork = new Number(localStorage.getItem('minWork'));
    let maxWork = new Number(localStorage.getItem('maxWork'));
    console.log("Pomduration Initial:" + pomDuration);
    console.log("Difficult Initial:" + difficult);
    console.log("MinWork Initial:" + minWork);
    console.log("Maxwork Initial:" + maxWork);
    console.log("PomReason:" + pomReason);
    console.log(pomDuration);
    if (!localStorage.getItem('pomDuration')) {
      console.log("NO POMDURATION")
      pomDuration = minWork;
      localStorage.setItem('pomDuration', pomDuration);
    }


    if (pomReason === "Work") {
      if (pomDuration && difficult) {
        if (difficult > 0) {
          pomDuration = pomDuration + pomDuration * -0.2;
        }

        else if (difficult < 0) {
          pomDuration = pomDuration + pomDuration * 0.2;
        }

        if (pomDuration < minWork) {
          pomDuration = minWork;
        }

        if (pomDuration > maxWork) {
          pomDuration = maxWork;
        }

        localStorage.setItem("difficult", 0);
        localStorage.setItem('pomDuration', pomDuration);
      }

      else {
        pomDuration = localStorage.getItem('minWork')
      }
    }

    if (pomReason === "Rest") {
      console.log("Pom reason rest: "+pomReason)
      pomDuration = pomDuration * 0.2;
    }

    if (pomReason === "Long Rest") {
      console.log("Pom reason lon rest: "+pomReason)
      pomDuration = pomDuration * 0.8;
    }


    pomDuration = Math.round(pomDuration);
    console.log("UseTimeCalculator return: " + pomDuration);
    return pomDuration;
  }


  return {
    calculateTime: calculateTime
  }
}

export default useTimeCalculator