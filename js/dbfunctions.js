const firebaseConfig = {
  apiKey: "AIzaSyDOYALzWbCOa3nrzZlUOBendAbAvv8C31A",
  authDomain: "test-b19d4.firebaseapp.com",
  projectId: "test-b19d4",
  storageBucket: "test-b19d4.appspot.com",
  messagingSenderId: "1066232540176",
  appId: "1:1066232540176:web:a120057fe558e9b7002e95",
  measurementId: "G-PSD9VKBZ2W"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const saveData = (game, percentage, time) => {
  var current_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  db.collection(`statistics-${game}/${current_date}`).add({
    game: game,
    correctAnswers: percentage,
    time: time
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

function fetchApi(key) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `js/data/api.json`, true);
  xhr.onload = function () {
    key = JSON.parse(xhr.response);
    return key.key
  };
  xhr.send();
}
