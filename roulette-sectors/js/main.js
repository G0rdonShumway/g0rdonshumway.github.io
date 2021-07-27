function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var input = document.querySelector("#answer-input");
var correctAnswers = 0;
var numberOfBets = document.querySelector("#numberOfBets span");

console.log(numberOfBets)

let betCells;


function typeDigit(n) {
    if (n.classList.contains("backspace")) {
        input.value = input.value.substring(0, input.value.length - 1);
    } else if (n.classList.contains("submit")) {
        saveResult();
    } else {
        input.value += n.textContent;
    }
}

function saveResult() {

    var activeBet = document.querySelector(".newBetActive");

    activeBet.setAttribute("data-uanswer", input.value);

    activeBet.classList.remove("newBetActive");
    if (activeBet.nextElementSibling) {
        activeBet.nextElementSibling.classList.add("newBetActive");
    } else {
        bjTotal();
    }
    input.value = "";
    numberOfBets.textContent = +numberOfBets.textContent + 1;

}

let bjResultTable = document.querySelector("#bjResult table tbody");

function bjTotal() {
    layout.classList.add("stopTimer");

    for (let i = 0; i < 10; i++) {

        var newResultRow = document.createElement("tr");

        newResultRow.innerHTML = `<td>${betCells[i].children[0].textContent} ${betCells[i].children[1].textContent}</td><td>${betCells[i].dataset.ranswer}</td><td>${betCells[i].dataset.uanswer}</td>`;

        bjResultTable.appendChild(newResultRow);

        if (newResultRow.children[1].textContent === newResultRow.children[2].textContent) {
            newResultRow.style.backgroundColor = "#3aee3a";
            correctAnswers++;
        } else {
            newResultRow.style.backgroundColor = "#db3333";
        }
    }

    document.querySelector("#calculationTime").textContent = timer.value;
    document.querySelector("#bjResult").style.display = "block";
    document.querySelector("#correctPercent").textContent = correctAnswers * 10 + "%";

}

let layout = document.querySelector("#layout");

function round5(x)
{
    return (x % 5) >= 4.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;
}

function fetchTripsData() {
    document.querySelector("#rouletteStart").style.display = "none";

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "js/roulette-sector.json", true);
    xhr.onload = function () {

        let data = JSON.parse(xhr.response);

        for (let i = 0; i < 10; i++) {
            var newBet = document.createElement("div");

            var sector = data[getRandomIntInclusive(0, 3)];

            var bet = getRandomIntInclusive(1, (sector.maxBet / 100) - 1) * 100 + (getRandomIntInclusive(-5, 5) * 10);

            var playsBy;
            var playsByBefore;
            var playsByAfter;

            if(bet <= sector.critical){
                playsBy = round5(bet / sector.coefficientBeforeCritical);
            } else {
                playsByBefore = sector.critical / sector.coefficientBeforeCritical;
                playsByAfter = (bet - sector.critical) / sector.coefficientAfterCritical;
                playsBy = round5(playsByAfter + playsByBefore);
            }

            console.log(playsBy)

            newBet.classList.add("tripsNewBet");
            newBet.setAttribute("data-ranswer", playsBy);
            newBet.innerHTML = `<h2>${sector.name[0].toUpperCase() + sector.name.substring(1)}</h2><p>${bet}</p>`;

            layout.appendChild(newBet);
        }

        betCells = Array.from(document.querySelectorAll(".tripsNewBet"));
        console.log(betCells)
    
        betCells[0].classList.add("newBetActive");

    }
    xhr.send();

    setTimeout(timerInput, 1000);
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
        if (minute === 2 && second === 30) {
            bjTotal();
        }

        timer.value = `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}.${decisecond < 10 ? "0" + decisecond : decisecond}`;

    }
}

function timerInput() {
    setInterval(tick, 10);
}