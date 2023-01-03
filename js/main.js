let completedBets = [];

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

let gameName;
let layout = document.querySelector("#layout");
let testResult = document.querySelector("#testResult table tbody");

function round5(x) {
  return x % 5 >= 4.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;
}

function startGame() {
  document.querySelector("#game-descr").style.display = "none";
  document.querySelector("#game-content").style.display = "flex";
  setTimeout(startTimer(), 1000);
}

function goBack() {
  localStorage.removeItem('game')
  showRatings('')
  window.location.reload();
}

const resolution = document.getElementById('resolution')

resolution.addEventListener('click', function (e) {
  e.target.style.opacity = e.target.style.opacity === '0' ? '1' : '0'
})
resolution.innerText = `${window.innerWidth} x ${window.innerHeight}`
