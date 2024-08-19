let min = 0;
let sec = 0;
let msec = 0;
let interval;
let isRunning = false;

const minDisplay = document.querySelector('.min');
const secDisplay = document.querySelector('.sec');
const msecDisplay = document.querySelector('.msec');
const lapsContainer = document.querySelector('.laps');
const toggleButton = document.querySelector('.toggle');
const playIcon = document.querySelector('.icon-play');
const pauseIcon = document.querySelector('.icon-pause');

function startStopwatch() {
    if (!isRunning) {
        interval = setInterval(() => {
            msec++;
            if (msec === 100) {
                msec = 0;
                sec++;
            }
            if (sec === 60) {
                sec = 0;
                min++;
            }
            updateDisplay();
        }, 10);
        isRunning = true;
        playIcon.classList.add('display-none');
        pauseIcon.classList.remove('display-none');
    } else {
        clearInterval(interval);
        isRunning = false;
        playIcon.classList.remove('display-none');
        pauseIcon.classList.add('display-none');
    }
}

function resetStopwatch() {
    clearInterval(interval);
    isRunning = false;
    min = 0;
    sec = 0;
    msec = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
    playIcon.classList.remove('display-none');
    pauseIcon.classList.add('display-none');
}

toggleButton.addEventListener('click', startStopwatch);


function updateDisplay() {
    minDisplay.textContent = `${min < 10 ? '0' + min : min} :`;
    secDisplay.textContent = `${sec < 10 ? '0' + sec : sec} :`;
    msecDisplay.textContent = `${msec < 10 ? '0' + msec : msec}`;
}

function recordLap() {
    if (isRunning) {
        const lapTime = `${min < 10 ? '0' + min : min} : ${sec < 10 ? '0' + sec : sec} : ${msec < 10 ? '0' + msec : msec}`;
        const lapItem = document.createElement('li');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `<span class="number">#${lapsContainer.children.length + 1}</span><span class="time-stamp">${lapTime}</span>`;
        lapsContainer.appendChild(lapItem);
    }
}

function clearLaps() {
    lapsContainer.innerHTML = '';
}

toggleButton.addEventListener('click', startStopwatch);
document.querySelector('.reset').addEventListener('click', resetStopwatch);
document.querySelector('.lap').addEventListener('click', recordLap);
document.querySelector('.lap-clear-button').addEventListener('click', clearLaps);
