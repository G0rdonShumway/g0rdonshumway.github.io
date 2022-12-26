const firebaseConfig = {
  apiKey: "AIzaSyDOYALzWbCOa3nrzZlUOBendAbAvv8C31A",
  authDomain: "test-b19d4.firebaseapp.com",
  projectId: "test-b19d4",
  storageBucket: "test-b19d4.appspot.com",
  messagingSenderId: "1066232540176",
  appId: "1:1066232540176:web:a120057fe558e9b7002e95",
  measurementId: "G-PSD9VKBZ2W"
};

function getMachineId() {
  let machineId = localStorage.getItem('MachineId');

  if (!machineId) {
    machineId = crypto.randomUUID();
    localStorage.setItem('MachineId', machineId);
  }
  return machineId;
}
function getUsername() {
  let username = localStorage.getItem('username');

  if (!username) {
    return false
  }
  return username;
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const saveData = (game, percentage, time) => {

  var date = new Date();
  var current_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  var timeCode = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  db.collection('tests').doc(getUsername() ? getUsername() : getMachineId()).collection(game).doc(`${current_date} ${timeCode}`).set({
    game: game,
    correctAnswers: percentage,
    time: time,
    timeCode: timeCode
  })
    .then((docRef) => {
      db.collection('users').doc(username).update({lastVisit: `${current_date} ${timeCode}`})
      console.log("Document written");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

