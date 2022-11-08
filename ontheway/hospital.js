import { 
  getHospitals, 
  getHospitalById,
  callAmbulance
} from "../store/api.js";
import { locationlatLng } from "./main.js";
import { 
  hospitalInfo, 
} from "./animation.js";
export const findHosInput = document.querySelector('.find-hos-input');
const modal = document.querySelector('.modal');
const loadingHospitalList = document.createElement("div");
loadingHospitalList.classList.add("sk-circle");
loadingHospitalList.innerHTML = `<div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div>`
let hId, callCase;
let cookie_log = document.cookie.split("; ").forEach((key, index)=>{
    var x;
    if((x = key.split("="))[0]=="_hId"){
        hId = x[1];
    }
    if((x = key.split("="))[0]=="_cId"){
        callCase = x[1];
    }
})
getHospitalById(hId).then((hos)=>{
  const boxHospital = document.createElement('div');
  boxHospital.classList.add("box-hospital--ontheway");
  boxHospital.innerHTML = `<h1 class="box-hospital--ontheway_name">${hos.name}</h1> <p class="box-hospital--ontheway_phone">Số điện thoại: ${hos.hotline.split(' ').join('')}</p>`
  document.querySelector('.box-hospital--ontheway').appendChild(boxHospital);
})

// const validateForm = (e)=>{
//   let value = document.querySelector('.input-phone-number').value
//   document.querySelector('.modal').classList.remove('open');
//   e.preventDefault();
//   callAmbulance(id_hospital, locationlatLng, value)
// }
// document.querySelector('.myForm').addEventListener("submit", validateForm);

const getAdress = (latLng, hosLocation) =>{
  var value = document.querySelector('.map-search-location--input').value;
  if(value==""){
    return `https://www.google.com/maps/dir/${encodeURIComponent(latLng)}/${encodeURIComponent(hosLocation)}`
  } else{
    return `https://www.google.com/maps/dir/${encodeURIComponent(value)}/${encodeURIComponent(hosLocation)}`
  }
}

// `<div class="tab-funtion-map--controls__navigate-container hospital-info"> <img class="hospital-info--img" src="${hos.image}" alt=""> <h2 class="hospital-info--name">Bệnh viện quận 9</h2> <span class="hospital-info--location"><img class="hospital-info--location_icon" src="./assets/img/map-pin.svg" alt=""><p class="hospital-info--location_address">387 Lê Văn Việt, Phường Tăng Nhơn Phú A , Quận 9 , Hồ Chí Minh</p></span> <span class="hospital-info--phone"><img class="hospital-info--phone_icon" src="./assets/img/phone.svg" alt=""><p class="hospital-info--phone_number">0333159054</p></span> <span class="hospital-info--specialist"><img class="hospital-info--specialist_icon" src="./assets/img/first-aid.svg" alt=""><p class="hospital-info--specialist_name">Đa khoa</p></span> <div class="ambulance-status"><svg xmlns="http://www.w3.org/2000/svg" class="ambulance-status--icon" fill="#1DD75B" id="Flat" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.12041,104.12041,0,0,1,232,128Z"></path></svg><p class="ambulance-status--text">Còn xe</p></div> <div class="hospital-info__navigate-direction"> <button class="direct-google-map"><a target="_blank" href="https://www.google.com/maps/dir/%C4%90%C6%B0%E1%BB%9Dng+s%E1%BB%91+2+C%C6%B0+x%C3%A1+Ra%C4%91a,+ph%C6%B0%E1%BB%9Dng+13,+Qu%E1%BA%ADn+6,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/168+%C4%90.+Phan+V%C4%83n+Tr%E1%BB%8B,+Ph%C6%B0%E1%BB%9Dng+5,+G%C3%B2+V%E1%BA%A5p,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh/@10.825258,106.6884562,17z/data=!3m1!4b1!4m11!4m10!1m2!1m1!1s0x31752c2aaf50fac1:0x30d41b0d708fad00!1m5!1m1!1s0x317528f1bae90d1d:0xdc67a6bbc407fb0e!2m2!1d106.6906449!2d10.825258!3e0?hl=vi-VN">Dẫn đường</a></button> <button class="direct-search">Tìm kiếm</button> </div>`