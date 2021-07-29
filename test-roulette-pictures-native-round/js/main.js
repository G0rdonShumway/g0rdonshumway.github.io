///////////////////////////////////////////////////////////////

// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 60;
const ALERT_THRESHOLD = 30;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 600;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;


function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      // onTimesUp();
      rouletteTotal();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}


///////////////////////////////////////////////////////////////
function hideEmpty() {
  var bet = Array.from(document.querySelectorAll(".bet"));
  bet.forEach((bet) => {
    if (bet.textContent == 0) {
      bet.style.display = "none";
    }
  });
}

function calculation(parent) {
  var bet = Array.from(parent.querySelectorAll(".bet"));
  var sum = 0;
  bet.forEach((bet) => {
    if (bet.dataset.bet === "sixline") {
      sum += bet.textContent * 5;
    }
    if (bet.dataset.bet === "corner") {
      sum += bet.textContent * 8;
    }
    if (bet.dataset.bet === "street") {
      sum += bet.textContent * 11;
    }
    if (bet.dataset.bet === "split") {
      sum += bet.textContent * 17;
    }
    if (bet.dataset.bet === "straight") {
      sum += bet.textContent * 35;
    }
  });

  parent.setAttribute("data-sum", sum);

  return sum;
}

function changeValue(input) {
  document.querySelector("label[for=numberOfPictures] span").textContent =
    input.value;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizer(parent) {
  var bet = Array.from(parent.querySelectorAll(".bet"));
  var numberOfChips = getRandomIntInclusive(1, 5) * 10;

  var sum = 0;
  while (sum < numberOfChips) {
    bet.forEach((bet) => {
      if (sum < numberOfChips && getRandomIntInclusive(0, 1)) {
        bet.textContent = Number(bet.textContent) + 1;
        sum++;
      }
    });
  }
}

var digit = Array.from(document.querySelectorAll(".digit"));
var input = document.querySelector("#answer-input");
var numberOfPictures;
var pictureIndex = 0;
var correctAnswers = 0;

function typeDigit(n) {
  if (n.classList.contains("backspace")) {
    input.value = input.value.substring(0, input.value.length - 1);
  } else if (n.classList.contains("submit")) {
    saveResult();
  } else {
    input.value += n.textContent;
  }
}

function rouletteTotal() {
  var tableRow = document.querySelectorAll("#rouletteResult table tbody tr");
  tableRow.forEach((row) => {
    console.dir(row);
    if (row.children[1].textContent == row.children[2].textContent) {
      row.children[2].style.backgroundColor = "#3aee3a";
      correctAnswers++;
    } else {
      row.children[2].style.backgroundColor = "#db3333";
    }
  });
  document.querySelector("#correctPercent").textContent =
    (correctAnswers * 100) / numberOfPictures + "%";
  document.querySelector("#rouletteResult").style.display = "block";
  document.querySelector("#calculationTime").textContent = timer.value;
}

function saveResult() {
  var activePicture = document.querySelectorAll("#layout > div")[pictureIndex];

  var tableCell = document.querySelectorAll("#rouletteResult table tbody td");

  activePicture.setAttribute("data-result", input.value);
  tableCell.forEach((cell) => {
    if (cell.dataset.pictureAnswer == pictureIndex + 1) {
      cell.textContent = input.value;
    }
  });

  input.value = "";
  activePicture.style.display = "none";

  pictureIndex++;

  if (pictureIndex == numberOfPictures) {
    layout.classList.add("stopTimer");
    rouletteTotal();
  }
}

let layout = document.querySelector("#layout");
let rouletteResult = document.querySelector("#rouletteResult table tbody");

function fetchRouletteData() {
  document.querySelector("#rouletteStart").style.display = "none";

  // setTimeout(timerInput, 1000);

  startTimer();

  console.log("Getting pictures...");
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "js/pictures.json", true);
  xhr.onload = function () {
    let data = JSON.parse(xhr.response);

    for (let i = 0; i < 20; i++) {
      let newPicture = document.createElement("div");
      newPicture.innerHTML =
        data[getRandomIntInclusive(0, 4)] +
        `<p class='pictureLabel'>Picture ${i + 1} of 20</p>`;

      layout.appendChild(newPicture);
      randomizer(newPicture);
      calculation(newPicture);

      let newTableRow = document.createElement("tr");
      newTableRow.innerHTML = `<td>${i + 1}</td><td data-picture='${
        i + 1
      }'>${calculation(newPicture)}</td><td data-picture-answer='${
        i + 1
      }'></td>`;
      rouletteResult.appendChild(newTableRow);

      newPicture.querySelectorAll(".red").forEach((cell) => {
        cell.style.color = "hsl(0deg 100% 48% / 1)";
      });
      newPicture.querySelectorAll(".black").forEach((cell) => {
        cell.style.color = "hsl(0deg 0% 0% / 1)";
      });
      newPicture.querySelectorAll(".green").forEach((cell) => {
        cell.style.color = "hsl(120deg 100% 25% / 1)";
      });
    }
    numberOfPictures = Array.from(
      document.querySelectorAll("#layout > div")
    ).length;

    hideEmpty();

    document.getElementById("answer-input").focus();
  };
  xhr.send();
}

let decisecond = 0;
let second = 0;
let minute = 0;
var timer = document.querySelector("#timer");

function tick() {
  if (!layout.classList.contains("stopTimer")) {
    decisecond++;
    if (decisecond > 99) {
      second++;
      decisecond = 0;
    }
    if (second > 59) {
      minute++;
      second = 0;
    }
    if (minute === 10) {
      layout.classList.add("stopTimer");
      rouletteTotal();
    }
    timer.value = `${minute < 10 ? "0" + minute : minute}:${
      second < 10 ? "0" + second : second
    }.${decisecond < 10 ? "0" + decisecond : decisecond}`;
  }
}
function timerInput() {
  setInterval(tick, 10);
}
