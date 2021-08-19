///////////////////////////////////////////////////////////////

const FULL_DASH_ARRAY = 283;
let WARNING_THRESHOLD;
let ALERT_THRESHOLD;

let COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

let TIME_LIMIT = 0;
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
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      // onTimesUp();
      testTotal();
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
  let { alert, warning, info } = COLOR_CODES;
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
var numberOfBets;
var betIndex = 0;
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

function testTotal() {
  if (gameName === "roulette-pictures") {
    var tableRow = document.querySelectorAll("#testResult table tbody tr");

    tableRow.forEach((row) => {
      if (row.children[1].textContent == row.children[2].textContent) {
        row.children[2].style.backgroundColor = "#3aee3a";
        correctAnswers++;
      } else {
        row.children[2].style.backgroundColor = "#db3333";
      }
    });
  } else if (gameName === "neighbours") {
    var current;
    for (let i = 0; i < 10; i++) {
      var newResultRow = document.createElement("tr");
      if (betCells[i].dataset.uanswer == undefined) {
        betCells[i].dataset.uanswer = "";
      }

      newResultRow.innerHTML = `
      <td>${i + 1}</td>
      <td colspan="2" class="answerCell">
        <span class="number-${
          betCells[i].children[0].value === betCells[i].children[0].dataset.ult
            ? "right"
            : "wrong"
        }">${betCells[i].children[0].value}</span>
        <span class="number-${
          betCells[i].children[1].value ===
          betCells[i].children[1].dataset.preult
            ? "right"
            : "wrong"
        }">${betCells[i].children[1].value}</span>
        <span>${betCells[i].children[2].value}</span>
        <span class="number-${
          betCells[i].children[3].value === betCells[i].children[3].dataset.next
            ? "right"
            : "wrong"
        }">${betCells[i].children[3].value}</span>
        <span class="number-${
          betCells[i].children[4].value ===
          betCells[i].children[4].dataset.nextafter
            ? "right"
            : "wrong"
        }">${betCells[i].children[4].value}</span>
      </td>`;

      testResult.appendChild(newResultRow);
    }
    var answers = document.querySelectorAll(`.answerCell`);

    answers.forEach((ans) => {
      if (ans.querySelectorAll(".number-right").length === 4) {
        correctAnswers++;
      }
    });

    var thead = document.querySelector("#testResult table thead");
    console.dir(thead);
    thead.children[1].children[1].setAttribute("colspan", 2);
    thead.children[1].children[1].textContent = "Answers";
    thead.children[1].removeChild(thead.children[1].children[2]);
  } else {
    for (let i = 0; i < 10; i++) {
      var newResultRow = document.createElement("tr");
      if (betCells[i].dataset.uanswer == undefined) {
        betCells[i].dataset.uanswer = "";
      }

      newResultRow.innerHTML = `
      <td>${betCells[i].children[0].textContent} ${betCells[i].children[1].textContent}</td>
      <td>${betCells[i].dataset.ranswer}</td>
      <td>${betCells[i].dataset.uanswer}</td>`;

      testResult.appendChild(newResultRow);

      if (
        newResultRow.children[1].textContent ===
        newResultRow.children[2].textContent
      ) {
        newResultRow.children[2].style.backgroundColor = "#3aee3a";
        correctAnswers++;
      } else {
        newResultRow.children[2].style.backgroundColor = "#db3333";
      }
    }
  }
  var timer = timePassed;

  if (timer >= 60) {
    timer = `${Math.floor(timer / 60)} min ${timer % 60} sec`;
  } else {
    timer = `${timer} sec`;
  }
  document.querySelector("#game-content").style.display = "none";

  document.querySelector("#correctPercent").textContent =
    (correctAnswers * 100) / numberOfBets + "%";
  document.querySelector("#testResult").style.display = "block";
  document.querySelector("#calculationTime").textContent = timer;
}

let gameName;

function saveResult() {
  if (gameName === "roulette-pictures") {
    var activePicture = document.querySelectorAll("#layout > div")[betIndex];

    var tableCell = document.querySelectorAll("#testResult table tbody td");

    activePicture?.setAttribute("data-result", input.value);
    tableCell.forEach((cell) => {
      if (cell.dataset.pictureAnswer == betIndex + 1) {
        cell.textContent = input.value;
      }
    });

    input.value = "";
    activePicture.style.display = "none";

    betIndex++;

    if (betIndex === 20) {
      testTotal();
    }
  } else if (gameName === "roulette-sector") {
    var activeBet = document.querySelector(".newBetActive");

    activeBet.setAttribute("data-uanswer", input.value);

    activeBet.classList.remove("newBetActive");
    if (activeBet.nextElementSibling) {
      activeBet.nextElementSibling.classList.add("newBetActive");
    } else {
      onTimesUp();
      testTotal();
    }

    input.value = "";
    numberOfBets.textContent = +numberOfBets.textContent + 1;
    betIndex++;
  } else if (gameName === "neighbours") {
    var activeBet = document.querySelector(".neighbour-active");
    var activeBlock = document.querySelector(".newBetActive");
    var bets = document.querySelectorAll(".neighbour");

    activeBet.setAttribute("value", input.value);

    if (
      (betIndex + 1) % 4 === 0 &&
      activeBlock.nextElementSibling &&
      betIndex < 39
    ) {
      activeBlock.classList.remove("newBetActive");
      activeBlock.nextElementSibling.classList.add("newBetActive");
    } else if (betIndex == 39) {
      onTimesUp();
      testTotal();
    }
    if (bets[betIndex]) {
      bets[betIndex].classList.remove("neighbour-active");
      if (bets[betIndex + 1]) {
        bets[betIndex + 1].classList.add("neighbour-active");
      }
    }

    input.value = "";
    numberOfBets.textContent = +numberOfBets.textContent + 1;
    betIndex++;
  } else {
    var activeBet = document.querySelector(".newBetActive");

    activeBet.setAttribute("data-uanswer", input.value);

    activeBet.classList.remove("newBetActive");
    if (activeBet.nextElementSibling) {
      activeBet.nextElementSibling.classList.add("newBetActive");
    } else {
      onTimesUp();
      testTotal();
    }
    input.value = "";
    numberOfBets.textContent = +numberOfBets.textContent + 1;
  }
}

let layout = document.querySelector("#layout");
let testResult = document.querySelector("#testResult table tbody");

function round5(x) {
  return x % 5 >= 4.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;
}

function fetchData(game) {
  document.querySelector("#linkList").style.display = "none";
  document.querySelector("#game-descr").style.display = "flex";

  var gameLabel = document.querySelector("#game");
  var goalLabel = document.querySelector("#goal");
  var betsLabel = document.querySelector("#bets");
  var timeLabel = document.querySelector("#timelimit");
  var header = document.querySelector("#game-title");

  let xhr = new XMLHttpRequest();

  xhr.open("GET", `js/${game}.json`, true);

  gameName = game;

  xhr.onload = function () {
    let data = JSON.parse(xhr.response);
    numberOfBets = data[0].numberOfBets;
    TIME_LIMIT = data[0].time;
    WARNING_THRESHOLD = TIME_LIMIT / 3;
    ALERT_THRESHOLD = TIME_LIMIT / 12;

    gameLabel.textContent = data[0].game;
    goalLabel.textContent = data[0].goal;
    betsLabel.textContent = data[0].bet;
    timeLabel.textContent = data[0].timelimit;
    header.textContent = data[0].title;

    if (game === "roulette-pictures") {
      for (let i = 0; i < numberOfBets; i++) {
        let newPicture = document.createElement("div");
        newPicture.innerHTML =
          data[1][getRandomIntInclusive(0, 4)] +
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
        testResult.appendChild(newTableRow);

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

      hideEmpty();
    } else if (game === "roulette-sector") {
      for (let i = 0; i < 10; i++) {
        var newBet = document.createElement("div");

        var sector = data[1][getRandomIntInclusive(0, 3)];

        var bet =
          getRandomIntInclusive(1, sector.maxBet / 100 - 1) * 100 +
          getRandomIntInclusive(-5, 5) * 10;

        var playsBy;
        var playsByBefore;
        var playsByAfter;

        if (bet <= sector.critical) {
          playsBy = round5(bet / sector.coefficientBeforeCritical);
        } else {
          playsByBefore = sector.critical / sector.coefficientBeforeCritical;
          playsByAfter =
            (bet - sector.critical) / sector.coefficientAfterCritical;
          playsBy = round5(playsByAfter + playsByBefore);
        }

        newBet.classList.add("newBet");
        newBet.setAttribute("data-ranswer", playsBy);
        newBet.innerHTML = `<h2>${
          sector.name[0].toUpperCase() + sector.name.substring(1)
        }</h2><p>${bet}</p><p class='betLabel'>Bet ${i + 1} of 10</p>`;

        layout.appendChild(newBet);
      }

      betCells = Array.from(document.querySelectorAll(".newBet"));

      betCells[0].classList.add("newBetActive");
    } else if (game === "neighbours") {
      var arr = [];
      var index;
      var amount = 0;

      while (amount < 10) {
        var newBet = document.createElement("div");

        index = getRandomIntInclusive(0, 36);

        if (!arr.some((i) => index === i)) {
          arr.push(index);
          amount++;
        }

        newBet.classList.add("neighbours");

        newBet.innerHTML = `
            <input disabled class="neighbour neighbour-active" data-ult=${
              data[1][index === 0 ? 35 : index === 1 ? 36 : index - 2]
            }>
            <input disabled class="neighbour" data-preult=${
              data[1][index - 1 === -1 ? 36 : index - 1]
            }>
            <input disabled data-number=${data[1][index]} value=${
              data[1][index++]
            }>
            <input disabled class="neighbour" data-next=${
              data[1][index === 37 ? 0 : index]
            }>
            <input disabled class="neighbour" data-nextafter=${
              data[1][index + 1 === 37 ? 0 : index + 1 === 38 ? 1 : ++index]
            }>
        `;
        
        layout.appendChild(newBet);
      }

      betCells = Array.from(document.querySelectorAll(".neighbours"));

      betCells[0].classList.add("newBetActive");
    } else {
      for (let i = 0; i < 10; i++) {
        var newBet = document.createElement("div");
        var bet = getRandomIntInclusive(1, 49) * 10 + 5;

        var combination = getRandomIntInclusive(0, 5);

        if (game === "blackjack") {
          combination = 0;
        }

        newBet.classList.add("newBet");
        newBet.setAttribute(
          "data-ranswer",
          bet * data[1][combination].coefficient
        );
        newBet.innerHTML = `<h2>${
          data[1][combination].name[0].toUpperCase() +
          data[1][combination].name.substring(1)
        }</h2><p>${bet}</p><p class='betLabel'>Bet ${i + 1} of 10</p>`;

        layout.appendChild(newBet);
      }

      betCells = Array.from(document.querySelectorAll(".newBet"));

      betCells[0].classList.add("newBetActive");

      if (data[2]) {
        var startScreen = document.querySelector("#game-descr");

        var paytable = document.createElement("table");

        paytable.innerHTML = `<table>
        <thead>
          <tr>
            <th style="padding: 2px" colspan="3">${data[2].name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 2px">&nbsp;</td>
            <td style="padding: 2px">Blind</td>
            <td style="padding: 2px">Trips</td>
          </tr>
        </tbody>
        </table>`;

        paytable.setAttribute(
          "style",
          "border-collapse: collapse; font-size: 14px;"
        );
        paytable.setAttribute("border", "1");

        data[2].combinations.forEach((c) => {
          var newRow = document.createElement("tr");
          newRow.innerHTML = `<td style="padding: 2px">${c.name}</td><td style="padding: 2px">${c.blind}</td><td style="padding: 2px">${c.trips}</td>`;
          paytable.tBodies[0].appendChild(newRow);
          console.dir(paytable.tBodies[0]);
        });

        startScreen.prepend(paytable);
      }
    }
  };
  xhr.send();
}

function startGame() {
  document.querySelector("#game-descr").style.display = "none";
  document.querySelector("#game-content").style.display = "flex";
  setTimeout(startTimer(), 1000);
}

function goBack() {
  window.location.reload();
}
