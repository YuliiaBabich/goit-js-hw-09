// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  calendar: document.querySelector('#datetime-picker'),
};

class Clockface {
  initTime;
  intervalId;
  isActive = false;

  constructor(render) {
    this.render = render;
  }
  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.initTime = Date.now();
    console.log('start');
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const diff = currentTime - this.initTime;
      const time = convertMsToTime(diff);
      this.render(time);
    }, 1000);
  }
  stop() {
    if (!this.isActive) return;
    console.log('stop');
    this.isActive = false;
    clearInterval(this.intervalId);
  }
}

const clockface = new Clockface(render);

refs.startBtn.addEventListener('click', () => {
  clockface.start();
});

refs.stopBtn.addEventListener('click', () => {
  clockface.stop();
});

function render(time) {
  refs.clockface.textContent = time;
}

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds,
  )}`;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
/*
const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;



startBtn.disabled = true;

Report.info(
  '👋 Greeting, my Friend!',
  'Please, choose a date and click on start',
  'Okay'
);

flatpickr(calendar, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.failure(
        '🥺 Ooops...',
        'Please, choose a date in the future and remember: "Knowledge rests not upon truth alone, but upon error also." - Carl Gustav Jung',
        'Okay'
      );
    } else {
      Report.success(
        '🥰 Congratulation! Click on start!',
        '"Do not try to become a person of success but try to become a person of value." <br/><br/>- Albert Einstein',
        'Okay'
      );
      startBtn.disabled = false;
      const setTimer = () => {
        selectedDate = selectedDates[0].getTime();
        timer.start();
      };

      startBtn.addEventListener('click', setTimer);
    }
  },
});

const timer = {
  rootSelector: document.querySelector('.timer'),
  start() {
    intervalId = setInterval(() => {
      startBtn.disabled = true;
      calendar.disabled = true;
      currentDate = Date.now();
      const delta = selectedDate - currentDate;

      if (delta <= 0) {
        this.stop();
        Report.info(
          '👏 Congratulation! Timer stopped!',
          'Please, if you want to start timer, choose a date and click on start or reload this page',
          'Okay'
        );
        return;
      }
      const { days, hours, minutes, seconds } = this.convertMs(delta);
      this.rootSelector.querySelector('[data-days]').textContent =
        this.addLeadingZero(days);
      this.rootSelector.querySelector('[data-hours]').textContent =
        this.addLeadingZero(hours);
      this.rootSelector.querySelector('[data-minutes]').textContent =
        this.addLeadingZero(minutes);
      this.rootSelector.querySelector('[data-seconds]').textContent =
        this.addLeadingZero(seconds);
    }, TIMER_DELAY);
  },

  stop() {
    clearInterval(intervalId);
    this.intervalId = null;
    startBtn.disabled = true;
    calendar.disabled = false;
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  },

  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  },
};*/