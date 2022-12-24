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

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const saveData = (game, percentage, time) => {

  var date = new Date();
  var current_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  db.collection(current_date).doc(getMachineId()).collection(game).add({
    game: game,
    correctAnswers: percentage,
    time: time,
    timeCode: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  })
    .then((docRef) => {
      console.log("Document written");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

