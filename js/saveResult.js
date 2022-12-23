
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

