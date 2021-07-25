function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var input = document.querySelector('#answer-input');
var correctAnswers = 0;
var numberOfBets = document.querySelector('#numberOfBets span');

console.log(numberOfBets)

let betCells;


function typeDigit(n) {
    if (n.classList.contains('backspace')) {
        input.value = input.value.substring(0, input.value.length - 1);
    } else if (n.classList.contains('submit')) {
        saveResult();
    } else {
        input.value += n.textContent;
    }
}

function saveResult() {

    var activeBet = document.querySelector('.newBetActive');

    activeBet.setAttribute('data-uanswer', input.value);

    activeBet.classList.remove('newBetActive');
    if (activeBet.nextElementSibling) {
        activeBet.nextElementSibling.classList.add('newBetActive');
    } else {
        bjTotal();
    }
    input.value = '';
    numberOfBets.textContent = +numberOfBets.textContent + 1;

}

let bjResultTable = document.querySelector('#bjResult table tbody');

function bjTotal() {
    layout.classList.add('stopTimer');

    for (let i = 0; i < 10; i++) {

        var newResultRow = document.createElement('tr');

        newResultRow.innerHTML = `<td>${betCells[i].children[0].textContent}</td><td>${betCells[i].dataset.ranswer}</td><td>${betCells[i].dataset.uanswer}</td>`;

        bjResultTable.appendChild(newResultRow);

        if (newResultRow.children[1].textContent === newResultRow.children[2].textContent) {
            newResultRow.style.backgroundColor = '#3aee3a';
            correctAnswers++;
        } else {
            newResultRow.style.backgroundColor = '#db3333';
        }
    }

    document.querySelector('#calculationTime').textContent = timer.value;
    document.querySelector('#bjResult').style.display = 'block';
    document.querySelector('#correctPercent').textContent = correctAnswers * 10 + '%';

}

let layout = document.querySelector('#layout');

function fetchBlackjackData() {
    document.querySelector("#rouletteStart").style.display = "none";

    for (let i = 0; i < 10; i++) {
        var newBet = document.createElement("div");
        var bet = getRandomIntInclusive(1, 49) * 10 + 5;
        newBet.classList.add('bjNewBet');
        newBet.setAttribute('data-ranswer', bet * 1.5);
        newBet.innerHTML = `<p>${bet}</p>`
        layout.appendChild(newBet);
    }

    betCells = Array.from(document.querySelectorAll('.bjNewBet'));

    betCells[0].classList.add('newBetActive');

    console.log(betCells)

    setTimeout(timerInput, 1000);
}


let decisecond = 0;
let second = 0;
let minute = 0;
var timer = document.querySelector('#timer');

function tick() {
    if (!layout.classList.contains('stopTimer')) {

        decisecond++;
        if (decisecond > 99) {
            second++;
            decisecond = 0;
        }
        if (second > 59) {
            minute++;
            second = 0;
        }
        if (minute === 1) {
            bjTotal();
        }

        timer.value = `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}.${decisecond < 10 ? '0' + decisecond : decisecond}`;

    }
}

function timerInput() {
    setInterval(tick, 10);
}