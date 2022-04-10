let numbers = Array.from(document.querySelectorAll(".number"));
let splits = Array.from(document.querySelectorAll(".split"));

function getNumber() {
  var num = Math.floor(Math.random() * 36);

  numbers.map((number) => {
    number.dataset.number == num.toString()
      ? (number.style.background = "#c3aeae")
      : (number.style.background = "transparent");
  });

  markSplits(splits, num);
}

function markSplits(arr, number) {
  var splitArr = [];
  arr.forEach((split) => {
    if (
      split.dataset.split.split("-").some((val) => val === number.toString())
    ) {
      splitArr.push(split);
    }
  });

  arr.map((split) => (split.style.background = "transparent"));
  splitArr.map((split) => (split.style.background = "#0b9b117a"));
}
