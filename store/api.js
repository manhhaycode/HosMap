import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

import {
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  update,
  push,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-database.js";

import { db, auth, database } from "./index.js";

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
  const hospitalSnapshot = await getDocs(hospitalCollection);
  let hospitalList = hospitalSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
    };
  });

  if (filter) {
    if (filter.city) {
      hospitalList = hospitalList.filter(
        (hospital) => hospital.city === filter.city
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

export const getHospitalByAccount = async (id) => {
  const accountDoc = doc(db, "account", id);
  const accountSnapshot = await getDoc(accountDoc);
  if (accountSnapshot.exists()) {
    const data = accountSnapshot.data();
    const hospitalDetail = await getHospitalById(data.hosId);
    return hospitalDetail;
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

//Authenticate
export const signIn = async ({ email, password }) => {
  const res = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return getHospitalByAccount(user.uid);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    });

  return res;
};

export const logOut = async () => {
  return signOut(auth)
    .then(() => {
      return "success";
    })
    .catch((error) => {
      return "error";
    });
};
//Authenticate
export const getCaseById = async (hosId, keyCall)=>{
  let dbr  = ref(database, "call/" + hosId.split(".")[0] + "/" + keyCall)
  let snapshot = await get(dbr);
  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    return null;
  }
}

export const getAmount = async(hosId)=>{
  let dbr  = ref(database, "call/" + hosId.split(".")[0])
  let snapshot = await get(dbr);
  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    return null;
  }
}

//Call realtime
export const callAmbulance = async(hosId, coordinate, phone) => {
  const newPostRef = push(ref(database, "call/" + hosId.split(".")[0]));
  const amountRef = ref(database, "call/" + hosId.split(".")[0] + "/amount");
  await get(amountRef).then((snapshot) => {
    if (!snapshot.exists()) {
      update(ref(database, "call/" + hosId.split(".")[0]), { amount: 3 });
    }
  });
  set(newPostRef, {
    coordinate,
    hosId,
    phone,
    ambulance: false,
    ambulancePos: "",
  });

  return newPostRef.key;
};

export const listenCall = (hosId, callback) => {
  const callRef = ref(database, "call/" + hosId.split(".")[0]);
  onValue(callRef, (snapshot) => {
    const data = snapshot.val();
    const mappedData = Object.keys(data)
      .filter((key) => key !== "amount")
      .map((key) => {
        return {
          ...data[key],
          cId: key,
        };
      });
    callback(mappedData, data.amount);
  });
};

export const listenAmbulance = (hosId, keyCall, callback) => {
  const callRef = ref(database, "call/" + hosId.split(".")[0] + "/" + keyCall);
  onValue(callRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const listenAmount = (hosId, callback) => {
  const callRef = ref(database, "call/" + hosId.split(".")[0]);
  onValue(callRef, (snapshot) => {
    const data = snapshot.val();
    callback(data.amount);
  });
};

export const receiveCall = async (hosId, keyCall) => {
  const callRef = ref(database, "call/" + hosId.split(".")[0] + "/" + keyCall);
  const amountRef = ref(database, "call/" + hosId.split(".")[0] + "/amount");

  update(callRef, {
    ambulance: true,
  });
  const amount = await get(amountRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return 0;
      }
    })
    .catch(() => {
      return 0;
    });
  if (amount > 0) {
    update(ref(database, "call/" + hosId.split(".")[0]), {
      amount: amount - 1,
    });
  }
};

export const updatePosition = (hosId, keyCall, ambulancePos) => {
  const callRef = ref(database, "call/" + hosId.split(".")[0] + "/" + keyCall);
  update(callRef, {
    ambulancePos: ambulancePos,
  });
};

export const deleteCall = (hosId, keyCall) => {
  remove(ref(database, "call/" + hosId.split(".")[0] + "/" + keyCall));
};
export const deleteAllCall = () => {
  remove(ref(database, "call/"));
};
