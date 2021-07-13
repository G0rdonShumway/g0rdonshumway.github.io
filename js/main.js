
// let selected = document.querySelector("#numberSelect select");


function hideEmpty() {
    var bet = Array.from(document.querySelectorAll('.bet'));
    bet.forEach(bet => {
        if (bet.textContent == 0) { bet.style.display = 'none' }
    });
}

function calculation(parent) {
    var bet = Array.from(parent.querySelectorAll('.bet'));
    var sum = 0;
    bet.forEach(bet => {
        if (bet.dataset.bet === "sixline") { sum += bet.textContent * 5 }
        if (bet.dataset.bet === "corner") { sum += bet.textContent * 8 }
        if (bet.dataset.bet === "street") { sum += bet.textContent * 11 }
        if (bet.dataset.bet === "split") { sum += bet.textContent * 17 }
        if (bet.dataset.bet === "straight") { sum += bet.textContent * 35 }
    });

    parent.setAttribute('data-sum', sum);


    return sum;
}

// function changeValue(input) {
//     document.querySelector("#chipsValue").textContent = input.value;
// }


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizer(parent) {
    var bet = Array.from(parent.querySelectorAll('.bet'));
    // var numberOfChips = document.querySelector("#chipsValue").textContent;
    var numberOfChips = getRandomIntInclusive(1,5) * 10;

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

// function getRandomChips() {
//     document.querySelector("#numberOfChips input").value = getRandomIntInclusive(1,10) * 10;
//     document.querySelector("#chipsValue").textContent = document.querySelector("#numberOfChips input").value;
// }

function startCount() {
    document.querySelector("#rouletteStart").style.display = "none";


    setTimeout(timerInput, 1000);
}


// function showOverlay() {
//     document.querySelector('#check-button').classList.add('check-pause');
//     document.querySelector('#overlay').style.display = 'block';
// }

var digit = Array.from(document.querySelectorAll('.digit'));
var input = document.querySelector('#answer-input');
var numberOfPictures;
var pictureIndex = 0;
var correctAnswers = 0;

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
    var activePicture = document.querySelectorAll('#layout > div')[pictureIndex];
    var tableRow = document.querySelectorAll('#rouletteResult table tbody tr');
    var tableCell = document.querySelectorAll('#rouletteResult table tbody td');

    activePicture.setAttribute('data-result', input.value);
    tableCell.forEach(cell => {
        if(cell.dataset.pictureAnswer == pictureIndex + 1){
            cell.textContent = input.value;
        }
    })

    input.value = '';
    activePicture.style.display = 'none';

    pictureIndex++;



    if(pictureIndex == numberOfPictures){
        layout.classList.add('stopTimer');

        tableRow.forEach(row => {
            console.dir(row);
            if(row.children[1].textContent == row.children[2].textContent){
                row.style.backgroundColor = '#3aee3a';
                correctAnswers++;
            } else {
                row.style.backgroundColor = '#db3333';
            }
        })
        document.querySelector('#correctPercent').textContent = correctAnswers * 100 / numberOfPictures + '%';
        document.querySelector('#rouletteResult').style.display = 'block';
        document.querySelector('#calculationTime').textContent = timer.value;
    }
}

let layout = document.querySelector('#layout');
let rouletteResult = document.querySelector('#rouletteResult table tbody');

function fetchData() {
    console.log('Getting pictures...');
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/js/pictures.json", true);
    xhr.onload = function () {
        let data = JSON.parse(xhr.response)

        for(let i = 0; i < 10; i++){
            let newPicture = document.createElement('div');
            newPicture.innerHTML = data[getRandomIntInclusive(0,4)];

            layout.appendChild(newPicture);
            randomizer(newPicture);
            calculation(newPicture);

            let newTableRow = document.createElement('tr');
            newTableRow.innerHTML = `<td>${i + 1}</td><td data-picture="${i + 1}">${calculation(newPicture)}</td><td data-picture-answer="${i + 1}"></td>`;
            rouletteResult.appendChild(newTableRow);


        }
        numberOfPictures = Array.from(document.querySelectorAll('#layout > div')).length;

        hideEmpty();
        
    }
    xhr.send();
}

fetchData();



// const modalCheck = document.querySelector('#check-modal');

// function checkAnswer() {
//     var wrong = document.createElement('span');
//     wrong.classList.add('wrong-span');
//     wrong.textContent = 'CHECK AGAIN!';


//     if (input.value == calculation()) {
//         modalCheck.classList.add('correct');

//         modalCheck.querySelector('.correct-span').textContent = 'Your time: ' + timer.value;

//         input.value = '';

//     } else {
//         if (!modalCheck.classList.contains('wrong')) {
//             modalCheck.appendChild(wrong);
//             modalCheck.classList.add('wrong');
//             setTimeout(function () {
//                 document.querySelector('#check-button').classList.remove('check-pause');
//                 document.querySelector('#overlay').style.display = 'none';
//                 modalCheck.removeChild(wrong);
//                 modalCheck.classList.remove('wrong');
//                 input.value = '';
//             }, 1000)
//         }
//     }
// }


// //////////////////////////////////////////

let decisecond = 0;
let second = 0;
let minute = 0;

function tick() {
    if (!layout.classList.contains('stopTimer')) {

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



// function returnToPicture() {
//     modalCheck.classList.remove('correct');
//     document.querySelector('#overlay').style.display = 'none';
//     document.querySelector('#check-button').classList.remove('check-pause');
//     decisecond = 0;
//     second = 0;
//     minute = 0;
//     timerInput();
// }
// ////////////////////////////////////////////

