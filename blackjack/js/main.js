function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var input = document.querySelector('#answer-input');
var correctAnswers = 0;

let answerCells = Array.from(document.querySelectorAll('.bjUserInput'));

answerCells.forEach(cell => {
    cell.addEventListener('click', function(){
        answerCells.forEach(item => {
            item.classList.remove('activeInputCell');
        })
        cell.classList.add('activeInputCell');
    })
})

function typeDigit(n) {
    if (n.classList.contains('backspace')) {
        input.value = input.value.substring(0, input.value.length - 1);
    } else if(n.classList.contains('submit')) {
        saveResult();
    } else {
        input.value += n.textContent;
    }
}

function saveResult(){

    for(let i = 0; i < answerCells.length; i++){
        if(answerCells[i].classList.contains('activeInputCell')){
            var nextCell = answerCells[i].parentElement.nextElementSibling.children[1];
            answerCells[i].textContent = input.value;
            answerCells[i].classList.remove('activeInputCell');
            console.log(nextCell.classList);
            nextCell.classList.add('activeInputCell')
        }
    }

    input.value = '';

}

let layout = document.querySelector('#layout');
var betCells = document.querySelectorAll('.bjBet');

function fetchBlackjackData() {
    document.querySelector("#rouletteStart").style.display = "none";

    betCells.forEach(bet => {
        var bjBet = getRandomIntInclusive(5, 49) * 10 + 5;
        bet.textContent = bjBet;
        bet.setAttribute('data-result', bjBet * 1.5);
    });



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
        if(minute === 10){
            layout.classList.add('stopTimer');
            rouletteTotal();
        }
        timer.value = `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}.${decisecond < 10 ? '0' + decisecond : decisecond}`;

    }
}
function timerInput() {
    setInterval(tick, 10);
}