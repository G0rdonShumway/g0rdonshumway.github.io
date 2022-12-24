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
  db.collection("statistics").add({
    game: game,
    correctAnswers: percentage,
    time: time,
    device: unescape(your_computernm)
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
