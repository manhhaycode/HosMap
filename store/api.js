import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

import { db } from "./index.js";

const covertStr = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

// Truyền city vào thì sẽ lọc theo city
/**
 * Ho Chi Minh -> "hcm"
 * Long An -> "la"
 * @param {*} filter {city, major, searchKeyword}
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
    if (filter.searchKeyword) {
      hospitalList = hospitalList.filter(
        (hospital) =>
          // Search Name
          covertStr(hospital.name.toLowerCase()).includes(
            covertStr(filter.searchKeyword.toLowerCase())
          ) ||
          // Search Location
          covertStr(hospital.location.toLowerCase()).includes(
            covertStr(filter.searchKeyword.toLowerCase())
          )
      );
    }
  }
  return hospitalList;
};

/**
 *
 * @param {*} id
 * @returns hospital
 */
export const getHospitalById = async (id) => {
  const hospitalDoc = doc(db, "hospital", id);
  const hospitalSnapshot = await getDoc(hospitalDoc);
  if (hospitalSnapshot.exists()) {
    const data = hospitalSnapshot.data();
    return {
      ...data,
      id,
    };
  } else {
    Promise.reject("Not found");
  }
};

/**
 *
 * @param {*} data
 * data: {
 *  name,
 *  location,
 *  city,
 *  major,
 *  image,
 *  coordinate
 * }
 * @returns status "success" || "error"
 */
export const addHospital = async (data) => {
  try {
    const id = Date.now().toString(16) + Math.random().toString(16);

    await setDoc(doc(db, "hospital", id), data);
    return "success";
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const getMajors = async () => {
  const majorCollection = collection(db, "major");
  const majorSnapshot = await getDocs(majorCollection);
  const majorList = majorSnapshot.docs.map((doc) => doc.data());
  return majorList;
};
