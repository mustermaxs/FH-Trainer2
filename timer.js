class Timer {
  constructor() {
    // this.gameflow = gameflow;
    this.progress;
    this.timerIsStopped = true;
    this.availableTimeSeconds = 30;
    this.timePastSeconds = 0;
    this.timeRemainingSeconds = 0;
    this.timePercentage = 0;
    this.answerSubmitted = false;
    this.timerprogressDOM = document.querySelector("#timerfull");
    this.timeUpEvent = new CustomEvent("timeUp");
    document.addEventListener("answersubmit", () => {
      this.answerSubmitted = true;
    });
  }

  set time(availableTimeSeconds) {
    this.availableTimeSeconds = availableTimeSeconds;
  }

  start() {
    //
    this.reset();
    this.timerIsStopped = true;
    this.timeIsUp = false;
    this.render();

    this.cycle = setInterval(() => {
      if (
        this.timePastSeconds - 0.5 >= this.availableTimeSeconds &&
        !this.answerSubmitted
      ) {
        this.timeIsUp = true;
        // console.log("CYCLE ");
        // console.log("av.time: " + this.availableTimeSeconds);
        this.reset();
        document.dispatchEvent(this.timeUpEvent);
      } else {
        this.render();
        this.timePastSeconds += 0.25;
      }
    }, 250);
  }
  stop() {
    //
    this.reset();
    var timeOnPause = this.timePastSeconds;

    this.timePastSeconds = timeOnPause;
    this.render();
  }
  get percentage() {
    return Math.round((this.timePastSeconds / this.availableTimeSeconds) * 100);
  }
  reset() {
    clearInterval(this.cycle);
    this.timerIsStopped = !this.timerIsStopped;
    this.timePastSeconds = 0;
    this.answerSubmitted = false;
    this.render();
  }
  render() {
    /*     this.progress = getPercentage(
          this.timePastSeconds,
          this.availableTimeSeconds
        );
        this.timerprogressDOM.style.width = `${this.progress}%`; */

    this.timerprogressDOM.style.width = `${this.percentage}%`;
  }
}
