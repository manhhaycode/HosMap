import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

import {
  getHospitals,
  getMajors,
  getHospitalById,
  addHospital,
} from "./api.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3DEaVU0YbWZI_V3_-CbbFurKhHlsiH30",
  authDomain: "ssg104-6b32e.firebaseapp.com",
  projectId: "ssg104-6b32e",
  storageBucket: "ssg104-6b32e.appspot.com",
  messagingSenderId: "218874240469",
  appId: "1:218874240469:web:8bcab0eae40f2bce45b15c",
  measurementId: "G-35K4BV8MBQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db };

// Test

addHospital({
  city: "hcm",
  name: "Test1",
}).then((res) => {
  console.log(res);
});

// getHospitals({
//   city: "hcm",
//   major: 0,
//   searchKeyword: "",
// }).then((res) => {
//   console.log(res);
// });

// getMajors().then((res) => {
//   console.log(res);
// });

// getHospitalById("CNwlCG6AZcTgE3YOBAmh")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));
