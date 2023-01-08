
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
        <span class="number-${betCells[i].children[0].value === betCells[i].children[0].dataset.ult
          ? "right"
          : "wrong"
        }">${betCells[i].children[0].value}</span>
        <span class="number-${betCells[i].children[1].value ===
          betCells[i].children[1].dataset.preult
          ? "right"
          : "wrong"
        }">${betCells[i].children[1].value}</span>
        <span>${betCells[i].children[2].value}</span>
        <span class="number-${betCells[i].children[3].value === betCells[i].children[3].dataset.next
          ? "right"
          : "wrong"
        }">${betCells[i].children[3].value}</span>
        <span class="number-${betCells[i].children[4].value ===
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
    timer = `${Math.floor(timer / 60)} min ${timer % 60 >= 10 ? timer % 60 : '0' + timer % 60} sec`;
  } else {
    timer = `0 min ${timer >= 10 ? timer : '0' + timer} sec`;
  }
  document.querySelector("#game-content").style.display = "none";

  document.querySelector("#correctPercent").textContent =
    (correctAnswers * 100) / numberOfBets + "%";
  document.querySelector("#testResult").style.display = "block";
  document.querySelector("#calculationTime").textContent = timer;
  
      console.log(completedBets)
  
  saveData(gameName, (correctAnswers * 100) / numberOfBets + "%", timer );
}
