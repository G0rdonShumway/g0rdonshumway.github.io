const URL_API = "https://api.random.org/json-rpc/4/invoke";

const MIN_NUMBER = 1;
const MAX_NUMBER = 60;
const COUNT_NUMBERS = 40;
const ANIMATION_TIME = 3000;
const INTERACTION_DELAY = 5000;

const numbersList = document.querySelector(".numbers");
numbersList.style.transition = `all ${ANIMATION_TIME/1000}s cubic-bezier(0.13, -0.08, 0.5, 1.14)`;

const numbersContainerElement = document.querySelector(".number_text_container");
const currentNumberContainerElement = document.querySelector(".current_number_text_container");

let randomNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

let shuffledRandomNums = shuffleArray([...randomNums]);

var randomNumsFullList = [];
for (let i = 0; i < 30; i++) {
  randomNumsFullList = randomNumsFullList.concat(shuffledRandomNums);
}

function fillNumbersList(list) {
  list.forEach((el) => {
    let newNum = document.createElement("span");
    newNum.classList.add("current_number_text");
    newNum.textContent = el;
    numbersList.appendChild(newNum);
  });
}

fillNumbersList(randomNumsFullList);

let currentRandomNumIndex = 0;
let currentRouletteNumIndex = 0;

document.addEventListener("keydown", function () {
    let lastInteractionTime = 0;
    const delay = INTERACTION_DELAY;

    return function (e) {
      const currentTime = new Date().getTime();
      if (currentTime - lastInteractionTime < delay) return;
      lastInteractionTime = currentTime;

      const keyCode = e.code;
      currentRandomNumIndex += 27;
      if (keyCode === "Space" && currentRandomNumIndex < 1081) {
        const nextRandomNum = getNextRandomNum();
        numbersList.style.transform = `translateY(calc(-${currentRandomNumIndex} * 39.13vh))`;
        setTimeout(() => {
          appendNumberElement(++currentRouletteNumIndex, nextRandomNum);
        }, ANIMATION_TIME + 200);
      }

      if (currentRandomNumIndex > 1134) {
        currentNumberContainerElement.classList.add("inactive");
        numbersContainerElement.classList.add("expanded");
        const numberTextElementList = document.querySelectorAll(".number_text");
        numberTextElementList.forEach((el) => el.classList.add("expanded"));
      }
    };
  }()
);

init();

async function init() {
  // const resp = await getRandomData();
  // randomNums = resp.result.random.data;
  // console.log(resp);
  // console.log(randomNums.length);
}

async function getRandomData() {
  const resp = await fetch(URL_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "generateIntegers",
      params: {
        apiKey: "79559685-2429-4a3b-9e0f-3f72ee044ba0",
        n: COUNT_NUMBERS,
        min: MIN_NUMBER,
        max: MAX_NUMBER,
        replacement: false,
        base: 10,
        pregeneratedRandomization: null,
      },
      id: 1,
    }),
  });
  return resp.json();
}

function getNextRandomNum() {
  return randomNumsFullList[currentRandomNumIndex];
}

function appendNumberElement(index, num) {
  const numberElement = document.createElement("li");
  numberElement.classList.add("number_text");
  const numberTitle = document.createElement("span");
  numberTitle.classList.add("number_title");
  numberTitle.textContent = num;
  numberElement.appendChild(numberTitle);
  const numberSubtitle = document.createElement("span");
  numberSubtitle.classList.add("number_subtitle");
  numberSubtitle.textContent = index < 38 ? index - 1 : "extra";
  numberElement.appendChild(numberSubtitle);
  numbersContainerElement.appendChild(numberElement);
}
