import { getHospitals } from "./store/api.js";
const hospitalList = document.querySelector('.tab-funtion-map--controls__hospitals-list');
const findHosInput = document.querySelector('.find-hos-input');
const getHospitalList = async (keyword) => {
  const res =  await getHospitals({
    city: "hcm",
    major: 0,
    searchKeyword: keyword,
  })
  hospitalList.innerHTML = ``;
  let resSorted = sortByDistance(res);
  resSorted.map((hos) => {hospitalList.insertAdjacentHTML("beforeend", `<div class="tab-funtion-map--controls__hospital-container"><div class="tab-funtion-map--controls__hospital-name-address"><div class="hospital-name-address--icon"><img src="./assets/img/icons8-hospital-64.png" class="hospital-name-address--icon__img" alt=""></div><div class="hospital-name-address--text"><h2 class="hospital--name">${hos.name}</h2><p class="hospital--address">${hos.location}</p></div></div><div class="tab-funtion-map--controls__hospital-info"><button class="phone-number"><svg xmlns="http://www.w3.org/2000/svg" class="phone-number--icon" fill="#4069E5FF" id="Flat" viewBox="0 0 256 256"><path d="M176,224C96.59766,224,32,159.40234,32,80A56.07029,56.07029,0,0,1,80.91992,24.44434a16.037,16.037,0,0,1,16.65235,9.583l20.09179,46.87793a15.96924,15.96924,0,0,1-1.32031,15.06641L99.709,121.38965l-.00195.00195a76.54083,76.54083,0,0,0,35.20508,35.04981l25.043-16.69336a15.95163,15.95163,0,0,1,15.17871-1.39453l46.83789,20.07324a16.03476,16.03476,0,0,1,9.584,16.65234A56.07032,56.07032,0,0,1,176,224ZM82.86621,40.33105A40.01746,40.01746,0,0,0,48,80,128.1454,128.1454,0,0,0,176,208a40.04283,40.04283,0,0,0,39.68262-34.92578L168.832,153.06055l-25.03515,16.69433a15.98041,15.98041,0,0,1-15.74512,1.14063,92.59535,92.59535,0,0,1-42.76367-42.56934,15.993,15.993,0,0,1,1.03222-15.69824l16.63574-25.419Zm52.1416,116.15625h0Z"/></svg><p class="phone-number--text">${hos.hotline}</p></button><div class="distance-hospital"><svg xmlns="http://www.w3.org/2000/svg" class="distance-hospital--icon" fill="#ef9834" id="Flat" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.12041,104.12041,0,0,1,232,128Z"/></svg><p class="distance-hospital--text">${distance("10.841317264569343, 106.80994737008923", hos.coordinate)}km</p></div><div class="ambulance-status"><svg xmlns="http://www.w3.org/2000/svg" class="ambulance-status--icon" fill="#1DD75B" id="Flat" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.12041,104.12041,0,0,1,232,128Z"/></svg><p class="ambulance-status--text">Còn xe</p></div><div class="hospital-ratings"><svg xmlns="http://www.w3.org/2000/svg" class="hospital-ratings--icon" fill="#FFDC00" id="Flat" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.12041,104.12041,0,0,1,232,128Z"/></svg><p class="hospital-ratings--text">Rank S</p></div></div></div>`)});
  return resSorted;
}

function distance(coordinates1, coordinates2) {
  var lat1 = coordinates1.split(", ")[0];
  var lon1 = coordinates1.split(", ")[1];
  var lat2 =  coordinates2.split(", ")[0];
  var lon2 = coordinates2.split(", ")[1];
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;
  return (12742 * Math.asin(Math.sqrt(a))).toFixed(1); // 2 * R; R = 6371 km
}

const sortByDistance = (res) => {
  let a = res.map((hos) =>{
    hos.distance = distance("10.841317264569343, 106.80994737008923", hos.coordinate);
    return hos;
  });
  let len = a.length;
  for(let i = 0; i < len - 1; i++) {
    for(let j = 0; j < len-i-1; j++) {
      if(a[j].distance*1 > a[j + 1].distance*1) {
        let tmp = a[j] ;
        a[j]  = a[j + 1] ;
        a[j + 1] = tmp;
      }
    }
  }
  return a;
}
getHospitalList("");
let i = 0;
findHosInput.addEventListener("input", ()=>{
  getHospitalList(findHosInput.value)
});





