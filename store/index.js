import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-database.js";

import {
  callAmbulance,
  listenCall,
  listenAmbulance,
  updatePosition,
  receiveCall,
  deleteCall,
  deleteAllCall,
} from "./api.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3DEaVU0YbWZI_V3_-CbbFurKhHlsiH30",
  authDomain: "ssg104-6b32e.firebaseapp.com",
  projectId: "ssg104-6b32e",
  storageBucket: "ssg104-6b32e.appspot.com",
  messagingSenderId: "218874240469",
  appId: "1:218874240469:web:8bcab0eae40f2bce45b15c",
  measurementId: "G-35K4BV8MBQ",
  databaseURL:
    "https://ssg104-6b32e-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const database = getDatabase(app);

export { app, db, auth, database };

// Test

const clgChange = (value) => {
  console.log(value);
};

const id = callAmbulance("1842979c32e0.eb8e1b09ef8e", "HN");
// listenAmbulance("1842979c32e0.eb8e1b09ef8e6", id, clgChange);
// listenCall("1842979c32e0.eb8e1b09ef8e6", clgChange);
// receiveCall("1842979c32e0.eb8e1b09ef8e6", id);
// updatePosition("1842979c32e0.eb8e1b09ef8e6", id, "HCM");

// callAmbulance("1842979c32e0.eb8e1b09ef8e6", "HHHHH");
// callAmbulance("1842979c32e0.eb8e1b09ef8e6", "LA");
// deleteCall("-NFsWwoiK5AK-OErLwK5");
// deleteAllCall();
