
function fetchData(game) {
  document.querySelector("#linkList").style.display = "none";
  document.querySelector("#game-descr").style.display = "flex";

  var gameLabel = document.querySelector("#game");
  var goalLabel = document.querySelector("#goal");
  var betsLabel = document.querySelector("#bets");
  var timeLabel = document.querySelector("#timelimit");
  var header = document.querySelector("#game-title");
  var appHeader = document.querySelector("#appTitle");

  let xhr = new XMLHttpRequest();

  xhr.open("GET", `js/data/${game}.json`, true);

  gameName = game;
  localStorage.setItem('game', game)
  showRatings(game)

  xhr.onload = function () {
    let data = JSON.parse(xhr.response);
    numberOfBets = data[0].numberOfBets;
    TIME_LIMIT = data[0].time;
    WARNING_THRESHOLD = TIME_LIMIT / 3;
    ALERT_THRESHOLD = TIME_LIMIT / 12;

    gameLabel.textContent = data[0].game;
    goalLabel.textContent = data[0].goal;
    betsLabel.textContent = data[0].bet;
    timeLabel.textContent = data[0].timelimit;
    header.textContent = data[0].title;
    appHeader.style.display = 'none'

    if (game === "roulette-pictures") {

      for (let i = 0; i < numberOfBets; i++) {
        let newPicture = document.createElement("div");
        newPicture.innerHTML =
          data[1][getRandomIntInclusive(0, 4)] +
          `<p class='pictureLabel'>Picture ${i + 1} of 20</p>`;

        layout.appendChild(newPicture);
        randomizer(newPicture);
        calculation(newPicture);

        let newTableRow = document.createElement("tr");
        newTableRow.innerHTML = `<td>${i + 1}</td><td data-picture='${i + 1
          }'>${calculation(newPicture)}</td><td data-picture-answer='${i + 1
          }'></td>`;
        testResult.appendChild(newTableRow);

        newPicture.querySelectorAll(".red").forEach((cell) => {
          cell.style.color = "hsl(0deg 100% 48% / 1)";
        });
        newPicture.querySelectorAll(".black").forEach((cell) => {
          cell.style.color = "hsl(0deg 0% 0% / 1)";
        });
        newPicture.querySelectorAll(".green").forEach((cell) => {
          cell.style.color = "hsl(120deg 100% 25% / 1)";
        });
        completedBets.push(newPicture)
      }
      console.log(completedBets)
      hideEmpty();
    } else if (game === "roulette-sector") {
      for (let i = 0; i < 10; i++) {
        var newBet = document.createElement("div");

        var sector = data[1][getRandomIntInclusive(0, 3)];

        var bet =
          getRandomIntInclusive(1, sector.maxBet / 100 - 1) * 100 +
          getRandomIntInclusive(-5, 5) * 10;

        var playsBy;
        var playsByBefore;
        var playsByAfter;

        if (bet <= sector.critical) {
          playsBy = round5(bet / sector.coefficientBeforeCritical);
        } else {
          playsByBefore = sector.critical / sector.coefficientBeforeCritical;
          playsByAfter =
            (bet - sector.critical) / sector.coefficientAfterCritical;
          playsBy = round5(playsByAfter + playsByBefore);
        }

        newBet.classList.add("newBet");
        newBet.setAttribute("data-ranswer", playsBy);
        newBet.innerHTML = `<h2>${sector.name[0].toUpperCase() + sector.name.substring(1)
          }</h2><p>${bet}</p><p class='betLabel'>Bet ${i + 1} of 10</p>`;

        layout.appendChild(newBet);
      }

      betCells = Array.from(document.querySelectorAll(".newBet"));

      betCells[0].classList.add("newBetActive");
    } else if (game === "neighbours") {
      var arr = [];
      var index;
      var amount = 0;

      document.querySelectorAll('.digit').forEach(dig => {
        dig.style.height = "60px"
      })
      document.querySelector('.dot').textContent = ''

      while (amount < 10) {

        index = getRandomIntInclusive(0, 36);

        if (arr.some((i) => index === i) === false) {
          arr.push(index);

          var newBet = document.createElement("div");

          newBet.classList.add("neighbours");

          newBet.innerHTML = `
              <input disabled class="neighbour neighbour-active" data-ult=${data[1][index === 0 ? 35 : index === 1 ? 36 : index - 2]
            }>
              <input disabled class="neighbour" data-preult=${data[1][index - 1 === -1 ? 36 : index - 1]
            }>
              <input disabled data-number=${data[1][index]} value=${data[1][index++]
            }>
              <input disabled class="neighbour" data-next=${data[1][index === 37 ? 0 : index]
            }>
              <input disabled class="neighbour" data-nextafter=${data[1][index + 1 === 37 ? 0 : index + 1 === 38 ? 1 : ++index]
            }>
          `;

          layout.appendChild(newBet);

          amount++;
        }
      }

      betCells = Array.from(document.querySelectorAll(".neighbours"));

      betCells[0].classList.add("newBetActive");
    } else {
      for (let i = 0; i < 10; i++) {
        var newBet = document.createElement("div");
        var betsArray = []
        var bet;
        if (!betsArray.includes(bet)) {
          bet = Math.ceil(Math.random() * 100) * 5
          betsArray.push(bet)

        }


        var combination = getRandomIntInclusive(0, 5);


        if (game === "blackjack") {
          combination = 0;
        }
        if (game === "colorRest") {
          combination = getRandomIntInclusive(0, 4);
        }

        newBet.classList.add("newBet");
        newBet.setAttribute(
          "data-ranswer",
          bet * data[1][combination].coefficient
        );
        newBet.innerHTML = `<h2>${data[1][combination].name[0].toUpperCase() +
          data[1][combination].name.substring(1)
          }</h2><p>${bet}</p><p class='betLabel'>Bet ${i + 1} of 10</p>`;

        layout.appendChild(newBet);
      }

      betCells = Array.from(document.querySelectorAll(".newBet"));

      betCells[0].classList.add("newBetActive");

      if (data[2]) {
        var startScreen = document.querySelector("#game-descr");

        var paytable = document.createElement("table");

        paytable.innerHTML = `<table>
        <thead>
          <tr>
            <th style="padding: 2px" colspan="3">${data[2].name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 2px">&nbsp;</td>
            <td style="padding: 2px">${data[2].firstCol}</td>
            <td style="padding: 2px">${data[2].secondCol}</td>
          </tr>
        </tbody>
        </table>`;
        paytable.setAttribute(
          "style",
          "border-collapse: collapse; font-size: 14px;"
        );
        paytable.setAttribute("border", "1");

        data[2].combinations.forEach((c) => {
          var newRow = document.createElement("tr");
          newRow.innerHTML = `<td style="padding: 2px">${c.name}</td><td style="padding: 2px">${c.firstCol}</td><td style="padding: 2px">${c.secondCol}</td>`;
          paytable.tBodies[0].appendChild(newRow);
        });

        startScreen.prepend(paytable);
      }
    }
  };
  xhr.send();
}
