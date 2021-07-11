
let selected = document.querySelector("#numberSelect select");


function hideEmpty() {
    var bet = Array.from(document.querySelectorAll('.activeChoice .bet'));
    bet.forEach(bet => {
        if (bet.textContent == 0) { bet.style.display = 'none' }
    });
}

function calculation() {
    var bet = Array.from(document.querySelectorAll('.activeChoice .bet'));
    var sum = 0;
    bet.forEach(bet => {
        if (bet.dataset.bet === "sixline") { sum += bet.textContent * 5 }
        if (bet.dataset.bet === "corner") { sum += bet.textContent * 8 }
        if (bet.dataset.bet === "street") { sum += bet.textContent * 11 }
        if (bet.dataset.bet === "split") { sum += bet.textContent * 17 }
        if (bet.dataset.bet === "straight") { sum += bet.textContent * 35 }
    })
    console.log(sum);
    return sum;
}

function changeValue(input) {
    document.querySelector("#chipsValue").textContent = input.value;
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizer() {
    var bet = Array.from(document.querySelectorAll('.activeChoice .bet'));
    var numberOfChips = document.querySelector("#chipsValue").textContent;

    var sum = 0;
    while (sum < numberOfChips) {
        bet.forEach(bet => {
            if(sum < numberOfChips && getRandomIntInclusive(0,1)){
                bet.textContent = Number(bet.textContent) + 1;
                sum++;
            }
        })
    }

}

function getRandomChips() {
    document.querySelector("#numberOfChips input").value = getRandomIntInclusive(1,10) * 10;
    document.querySelector("#chipsValue").textContent = document.querySelector("#numberOfChips input").value;
}

function startCount() {
    document.querySelector("#rouletteStart").style.display = "none";
    var randomUnit = getRandomIntInclusive(1,5);
    if(selected.options[selected.selectedIndex].value === 'random'){
        document.querySelector("#" + selected.options[randomUnit].value).style.display = "block";
        document.querySelector("#" + selected.options[randomUnit].value).classList.add('activeChoice');
    } else {
        document.querySelector("#" + selected.options[selected.selectedIndex].value).style.display = "block";
        document.querySelector("#" + selected.options[selected.selectedIndex].value).classList.add('activeChoice');
    }
    randomizer();
    hideEmpty();
    calculation();
    setTimeout(timerInput, 1000);
}


function showOverlay() {
    document.querySelector('#check-button').classList.add('check-pause');
    document.querySelector('#overlay').style.display = 'block';
}

var digit = Array.from(document.querySelectorAll('.digit'));
var input = document.querySelector('#answer-input');

function typeDigit(n) {
    if (n.classList.contains('backspace')) {
        input.value = input.value.substring(0, input.value.length - 1);
    } else {
        input.value += n.textContent;
    }
}

const modalCheck = document.querySelector('#check-modal');

function checkAnswer() {
    var wrong = document.createElement('span');
    wrong.classList.add('wrong-span');
    wrong.textContent = 'CHECK AGAIN!';


    if (input.value == calculation()) {
        modalCheck.classList.add('correct');

        modalCheck.querySelector('.correct-span').textContent = 'Your time: ' + timer.value;

        input.value = '';

    } else {
        if (!modalCheck.classList.contains('wrong')) {
            modalCheck.appendChild(wrong);
            modalCheck.classList.add('wrong');
            setTimeout(function () {
                document.querySelector('#check-button').classList.remove('check-pause');
                document.querySelector('#overlay').style.display = 'none';
                modalCheck.removeChild(wrong);
                modalCheck.classList.remove('wrong');
                input.value = '';
            }, 1000)
        }
    }
}


//////////////////////////////////////////

let decisecond = 0;
let second = 0;
let minute = 0;

function tick() {
    if (!document.querySelector('#check-button').classList.contains('check-pause')) {

        var timer = document.querySelector('#timer');
        decisecond++;
        if (decisecond > 99) {
            second++;
            decisecond = 0;
        }
        if (second > 59) {
            minute++;
            second = 0;
        }
        timer.value = `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}.${decisecond < 10 ? '0' + decisecond : decisecond}`;

    }
}
function timerInput() {
    setInterval(tick, 10);
}



function returnToPicture() {
    modalCheck.classList.remove('correct');
    document.querySelector('#overlay').style.display = 'none';
    document.querySelector('#check-button').classList.remove('check-pause');
    decisecond = 0;
    second = 0;
    minute = 0;
    timerInput();
}
////////////////////////////////////////////