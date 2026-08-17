import flatpickr from "flatpickr";
import { Report } from "notiflix/build/notiflix-report-aio";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  calendar: document.querySelector("#datetime-picker"),
  daysValue: document.querySelector("span[data-days"),
  hoursValue: document.querySelector("span[data-hours"),
  minutesValue: document.querySelector("span[data-minutes"),
  secondsValue: document.querySelector("span[data-seconds"),
  startBtn: document.querySelector("[data-start]"),
};

const {
  calendar,
  daysValue,
  hoursValue,
  minutesValue,
  secondsValue,
  startBtn,
} = refs;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const beginenTime = new Date();
    if (selectedDates[0].getTime() < beginenTime.getTime()) {
      return Report.failure(
        "Please choose a date in the future",
        '"Failure is simply the opportunity to begin again, this time more intelligently." <br/><br/>- Andrii Savin',
        "Okay",
      );
    }
    refs.startBtn.disabled = false;

    initializationTime = selectedDates[0].getTime();
  },
};

let initializationTime = 0;
let timerId = null;

startBtn.disabled = true;

flatpickr(calendar, options);

startBtn.addEventListener("click", calendarCount);

function calendarCount() {
  timerId = setInterval(() => {
    const beginenTime = new Date();
    startBtn.disabled = true;

    if (beginenTime.getTime() > initializationTime) {
      daysValue.textContent = "00";
      hoursValue.textContent = "00";
      minutesValue.textContent = "00";
      secondsValue.textContent = "00";
      clearInterval(timerId);
      return;
    }

    const timeNow = convertMs(initializationTime - beginenTime.getTime());

    const { days, hours, minutes, seconds } = addLeadingZero(timeNow);

    daysValue.textContent = days;
    hoursValue.textContent = hours;
    minutesValue.textContent = minutes;
    secondsValue.textContent = seconds;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  for (const key in value) {
    value[key] = String(value[key]).padStart(2, "0");
  }

  return value;
}
