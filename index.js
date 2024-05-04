let intervalId;
let minutes = (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
let seconds = (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
let centesimals = (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});


let counter = 0;

let laps = [];


const secondsElement = document.querySelectorAll('.seconds');
const minutesElement = document.querySelectorAll('.minutes');
const centesimalsElement = document.querySelectorAll('.centesimals');

centesimalsElement.forEach((value) => value.innerHTML = centesimals);
secondsElement.forEach((value) => value.innerHTML = seconds);
minutesElement.forEach((value) => value.innerHTML = minutes);

let isStarted = false;

renderLaps();


function renderLaps () {
  let lapsHTML = '';

  laps.slice().reverse().forEach((lap) => {
    const centesimals = (lap.centesimals).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const seconds = (lap.seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const minutes = (lap.minutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const counter = lap.counter;
    const html = `
      <tr>
        <td>Lap ${counter}</td>
        <td class="lap-time-dash">
          <div class="minutes">${minutes}</div>
          <div>:</div>
          <div class="seconds">${seconds}</div>
          <div>:</div>
          <div class="centesimals">${centesimals}</div>
        </td>
      </tr>
    `
    lapsHTML += html;

    document.querySelector('table').innerHTML = lapsHTML;
  });
}



function startTimer() {
  if (!isStarted) {
    isStarted = true;
    document.querySelector('.start-stop-button').innerHTML = 'Stop';
    document.querySelector('.start-stop-button').classList.add('stop-color');
    intervalId = setInterval(() => {
      if (centesimals < 99) {
        centesimals++;
        centesimalsElement.forEach((value) => value.innerHTML = centesimals.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
      } else if (seconds < 59 && centesimals === 99) {
        centesimals = 0;
        seconds++;
        centesimalsElement.forEach((value) => value.innerHTML = centesimals.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
        secondsElement.forEach((value) => value.innerHTML = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
      } else if (seconds === 59) {
        seconds = -1;
        minutes++;
        secondsElement.forEach((value) => value.innerHTML = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
        minutesElement.forEach((value) => value.innerHTML = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
      }
    }, 10);
    document.querySelector('.reset-button').innerHTML = 'Lap';
    document.querySelector('.reset-button').classList.add('lap-button');

  } else {
    isStarted = false;
    document.querySelector('.start-stop-button').innerHTML = 'Start';
    document.querySelector('.start-stop-button').classList.remove('stop-color');
    document.querySelector('.reset-button').innerHTML = 'Reset';
    document.querySelector('.reset-button').classList.remove('lap-button');
    clearInterval(intervalId)
  }
}


function resetTimer() {
  if (!isStarted) {
    clearInterval(intervalId);
    minutes = (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    seconds = (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});;
    centesimals = (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});;
    centesimalsElement.forEach((value) => value.innerHTML = centesimals);
    secondsElement.forEach((value) => value.innerHTML = seconds);
    minutesElement.forEach((value) => value.innerHTML = minutes);
    laps = [];
    counter = 0;
    document.querySelector('table').innerHTML = ''
    document.querySelector('.lap-name').innerHTML = `Lap ${counter + 1}`;
    renderLaps();
  } else {
    createLap();
  }
}


function createLap () {
  counter++;
  laps.push({
    centesimals,
    seconds,
    minutes,
    counter
  });

  document.querySelector('.lap-name').innerHTML = `Lap ${counter + 1}`;

  renderLaps();
}


document.querySelector('.start-stop-button').addEventListener('click', () => startTimer());
document.querySelector('.reset-button').addEventListener('click', () => resetTimer());
