const showRatings = (game) => {
  db.collection(game)
    .get()
    .then((querySnapshot) => {
      var chart = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var element = {}
        element.name = doc.data().username
        element.time = doc.data().time

        chart.push(element)

      });
      function compare(a, b) {
        if (a.time < b.time) {
          return -1;
        }
        if (a.time > b.time) {
          return 1;
        }
        return 0;
      }

      const newChart = chart.sort(compare);
      if (newChart.length > 10) newChart.length = 10
      console.log(newChart)

      newChart.map((item, index) => {
        var newRatingsItem = document.createElement('div')
        newRatingsItem.classList.add("ratings-item")
        document.getElementById('ratings').appendChild(newRatingsItem)

        newRatingsItem.outerHTML = `
        <div class="ratings-item">
          <div class="ratings-name">
            <span class="ratings-index" data-index=${index + 1}>${index + 1}</span>
            ${item.name}
          </div>
          <div class="ratings-time">${item.time}</div>
        </div>`
      })
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}