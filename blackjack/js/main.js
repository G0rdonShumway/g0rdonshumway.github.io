function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var input = document.querySelector('#answer-input');
var correctAnswers = 0;

let answerCells = Array.from(document.querySelectorAll('.bjUserInput'));
let betCells = Array.from(document.querySelectorAll('.bjBet'));

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

    for(let i = 0; i < 10; i++){
        if(answerCells[i].classList.contains('activeInputCell') && answerCells.some(cell => cell.textContent == '')){
            answerCells[i].textContent = input.value;
            answerCells[i].classList.remove('activeInputCell');
            answerCells[++i].classList.add('activeInputCell')
        } else if(answerCells.every(cell => cell.textContent != '')){
            bjTotal();
        }
    }


    input.value = '';

}

let bjResultTable = document.querySelector('#bjResult table tbody');

function bjTotal(){
    layout.classList.add('stopTimer');

    for(let i = 0; i < 10; i++){

        var newResultRow = document.createElement('tr');
        newResultRow.innerHTML = `<td>${betCells[i].textContent}</td><td>${betCells[i].dataset.result}</td><td>${answerCells[i].textContent}</td>`;

        bjResultTable.appendChild(newResultRow);

        if(newResultRow.children[1].textContent === newResultRow.children[2].textContent){
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
        if(minute === 2){
            bjTotal();
        }
        
        timer.value = `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}.${decisecond < 10 ? '0' + decisecond : decisecond}`;

    }
}
function timerInput() {
    setInterval(tick, 10);
}