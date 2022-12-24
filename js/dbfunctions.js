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

const register = () => {
  const email = document.getElementById('email').value
  const pass = document.getElementById('pass').value

  auth.createUserWithEmailAndPassword(email, pass)
    .then((res) => {
      console.log(res.user)
    })
    .catch((err) => {
      alert(err.message)
      console.error(err.message);
    })


}
const login = () => {
  const email = document.getElementById('email').value
  const pass = document.getElementById('pass').value

  auth.signInWithEmailAndPassword(email, pass)
    .then((res) => {
      console.log(res.user)
    })
    .catch((err) => {
      alert(err.message)
      console.error(err.message);
    })
}

const saveData = () => {
  const email = document.getElementById('email').value
  const pass = document.getElementById('pass').value
  db.collection("users").add({
    name: 'G0rdon',
    email: 'pavel.sky.zorin@gmail.com',
    password: '123456'
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
