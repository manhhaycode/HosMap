import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

import { db } from "./index.js";

// Truyền city vào thì sẽ lọc theo city
/**
 * Ho Chi Minh -> "hcm"
 * Long An -> "la"
 * @param {*} filter
 * @returns list hospital
 */
export const getHospitals = async (filter) => {
  const hospitalCollection = collection(db, "hospital");
  const majorCollection = collection(db, "major");
  const hospitalSnapshot = await getDocs(hospitalCollection);
  const majorSnapshot = await getDocs(majorCollection);
  let hospitalList = hospitalSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
    };
  });
  const majorList = majorSnapshot.docs.map((doc) => doc.data());
  hospitalList = hospitalList.map((hospital) => {
    return {
      ...hospital,
      major: majorList.filter((major) => major.id === hospital.major)[0],
    };
  });
  if (filter) {
    if (filter.city) {
      hospitalList = hospitalList.filter(
        (hospital) => hospital.city === filter.city
      );
    }
    if (filter.major) {
      hospitalList = hospitalList.filter(
        (hospital) => hospital.major.id === filter.major
      );
    }
  }
  return hospitalList;
};

export const getMajors = async () => {
  const majorCollection = collection(db, "major");
  const majorSnapshot = await getDocs(majorCollection);
  const majorList = majorSnapshot.docs.map((doc) => doc.data());
  return majorList;
};
