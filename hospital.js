import { 
  getHospitals, 
  getHospitalById,
  callAmbulance,
  listenAmount,
} from "./store/api.js";
import { locationlatLng } from "./main.js";
import { 
  hospitalInfo, 
  slideLeft,
  slideRight
} from "./animation.js";

let region = "hcm", id_hospital;
const hospitalList = document.querySelector('.tab-funtion-map--controls__hospitals-list');
export const findHosInput = document.querySelector('.find-hos-input');
const regionButtonName = document.querySelector('.region-box--button-name');
const regionName = document.querySelector('.region-name');
const modal = document.querySelector('.modal');
document.querySelector('.search-region-box').addEventListener('click', async()=>{
  if(region == "hcm"){
    regionButtonName.childNodes[0].nodeValue = " Long An 🇻🇳 "
    regionName.childNodes[0].nodeValue = "Hồ Chí Minh";
    region = "la";
  } else {
    regionButtonName.childNodes[0].nodeValue = " Ho Chi Minh 🇻🇳 "
    regionName.childNodes[0].nodeValue = "Long An";
    region = "hcm";
  }
  await getHospitalList("");
})


const loadingHospitalList = document.createElement("div");
loadingHospitalList.classList.add("sk-circle");
loadingHospitalList.innerHTML = `<div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div>`
 
export const getHospitalList = async (keyword, ambulanceStatus) => {
  let status = "Còn xe", colorStatus = "#1DD75B"
  if(ambulanceStatus){
    status = "Hết xe";
    colorStatus = "red";
  }
  slideLeft();
  hospitalList.innerHTML = ``;
  hospitalList.style.background = "#F6F6F6";
  hospitalList.appendChild(loadingHospitalList);
const res = await getHospitals({
    city: region,
    searchKeyword: keyword,
  });
  if(locationlatLng){
    if(document.querySelector('.hospital-list-error-cointainer')){
      document.querySelector('.hospital-list-error-cointainer').remove();
      document.querySelector('.tab-funtion-map--controls__header').style.display = "block";
    }
    let resSorted = sortByDistance(res);
    hospitalList.innerHTML = ``;
    resSorted.map((hos, i) => {
      const boxHospital = document.createElement("div");
      boxHospital.classList.add("tab-funtion-map--controls__hospital-container");
      boxHospital.setAttribute("id_hospital", hos.id);
      boxHospital.addEventListener("click", async () =>{
        await getHospitalInfo(hos.id);
      });
      if(hos.id!="1842979c32e0.eb8e1b09ef8e6"){
        boxHospital.innerHTML = `<div class="tab-funtion-map--controls__hospital-name-address"><div class="hospital-name-address--icon"><img src="./assets/img/icons8-hospital-64.png" class="hospital-name-address--icon__img" alt=""></div><div class="hospital-name-address--text"><h2 class="hospital--name">${hos.name}</h2><p class="hospital--address">${hos.location}</p></div></div><div class="tab-funtion-map--controls__hospital-info"><button class="phone-number"><svg xmlns="http://www.w3.org/2000/svg" class="phone-number--icon" fill="#4069E5FF" id="Flat" viewBox="0 0 256 256"><path d="M176,224C96.59766,224,32,159.40234,32,80A56.07029,56.07029,0,0,1,80.91992,24.44434a16.037,16.037,0,0,1,16.65235,9.583l20.09179,46.87793a15.96924,15.96924,0,0,1-1.32031,15.06641L99.709,121.38965l-.00195.00195a76.54083,76.54083,0,0,0,35.20508,35.04981l25.043-16.69336a15.95163,15.95163,0,0,1,15.17871-1.39453l46.83789,20.07324a16.03476,16.03476,0,0,1,9.584,16.65234A56.07032,56.07032,0,0,1,176,224ZM82.86621,40.33105A40.01746,40.01746,0,0,0,48,80,128.1454,128.1454,0,0,0,176,208a40.04283,40.04283,0,0,0,39.68262-34.92578L168.832,153.06055l-25.03515,16.69433a15.98041,15.98041,0,0,1-15.74512,1.14063,92.59535,92.59535,0,0,1-42.76367-42.56934,15.993,15.993,0,0,1,1.03222-15.69824l16.63574-25.419Zm52.1416,116.15625h0Z"/></svg><p class="phone-number--text">${hos.hotline.split(' ').join('')}</p></button><div class="distance-hospital"><svg xmlns="http://www.w3.org/2000/svg" class="distance-hospital--icon" fill="#ef9834" id="Flat" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.12041,104.12041,0,0,1,232,128Z"/></svg><p class="distance-hospital--text">${hos.distance}km</p></div><div class="ambulance-status"><svg xmlns="http://www.w3.org/2000/svg" class="ambulance-status--icon" fill="#1DD75B" id="Flat" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.12041,104.12041,0,0,1,232,128Z"/></svg><p class="ambulance-status--text">Còn xe</p></div></div>`;
      } else{
        boxHospital.innerHTML = `<div class="tab-funtion-map--controls__hospital-name-address"><div class="hospital-name-address--icon"><img src="./assets/img/icons8-hospital-64.png" class="hospital-name-address--icon__img" alt=""></div><div class="hospital-name-address--text"><h2 class="hospital--name">${hos.name}</h2><p class="hospital--address">${hos.location}</p></div></div><div class="tab-funtion-map--controls__hospital-info"><button class="phone-number"><svg xmlns="http://www.w3.org/2000/svg" class="phone-number--icon" fill="#4069E5FF" id="Flat" viewBox="0 0 256 256"><path d="M176,224C96.59766,224,32,159.40234,32,80A56.07029,56.07029,0,0,1,80.91992,24.44434a16.037,16.037,0,0,1,16.65235,9.583l20.09179,46.87793a15.96924,15.96924,0,0,1-1.32031,15.06641L99.709,121.38965l-.00195.00195a76.54083,76.54083,0,0,0,35.20508,35.04981l25.043-16.69336a15.95163,15.95163,0,0,1,15.17871-1.39453l46.83789,20.07324a16.03476,16.03476,0,0,1,9.584,16.65234A56.07032,56.07032,0,0,1,176,224ZM82.86621,40.33105A40.01746,40.01746,0,0,0,48,80,128.1454,128.1454,0,0,0,176,208a40.04283,40.04283,0,0,0,39.68262-34.92578L168.832,153.06055l-25.03515,16.69433a15.98041,15.98041,0,0,1-15.74512,1.14063,92.59535,92.59535,0,0,1-42.76367-42.56934,15.993,15.993,0,0,1,1.03222-15.69824l16.63574-25.419Zm52.1416,116.15625h0Z"/></svg><p class="phone-number--text">${hos.hotline.split(' ').join('')}</p></button><div class="distance-hospital"><svg xmlns="http://www.w3.org/2000/svg" class="distance-hospital--icon" fill="#ef9834" id="Flat" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.12041,104.12041,0,0,1,232,128Z"/></svg><p class="distance-hospital--text">${hos.distance}km</p></div><div class="ambulance-status"><svg xmlns="http://www.w3.org/2000/svg" class="ambulance-status--icon" fill=${colorStatus} id="Flat" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.12041,104.12041,0,0,1,232,128Z"/></svg><p class="ambulance-status--text">${status}</p></div></div>`;
      }
      
      hospitalList.appendChild(boxHospital);
    });
    loadingHospitalList.remove();
    hospitalList.style.background = "none";
    // console.log(resSorted)
    return resSorted;
  } else{
    loadingHospitalList.remove();
    document.querySelector('.tab-funtion-map--controls__header').style.display = "none";
    hospitalList.style.background = "none";
  }

}

const getHospitalInfo = async(id) =>{
  const hos = await getHospitalById(id);
  const boxHospital = document.createElement("div");
  boxHospital.classList.add("tab-funtion-map--controls__navigate-container", "hospital-info");
  boxHospital.setAttribute("id_hospital", hos.id);
  id_hospital  = hos.id;
  const imgHospital = document.createElement("img");
  imgHospital.classList.add("hospital-info--img");
  imgHospital.setAttribute("src", hos.image);
  boxHospital.innerHTML = `<h2 class="hospital-info--name">${hos.name}</h2> <span class="hospital-info--location"><img class="hospital-info--location_icon" src="./assets/img/map-pin.svg" alt=""><p class="hospital-info--location_address">${hos.location}</p></span> <span class="hospital-info--phone"><img class="hospital-info--phone_icon" src="./assets/img/phone.svg" alt=""><p class="hospital-info--phone_number">${hos.hotline}</p></span> <span class="hospital-info--specialist"><img class="hospital-info--specialist_icon" src="./assets/img/first-aid.svg" alt=""><p class="hospital-info--specialist_name">Đa khoa</p></span> <div class="ambulance-status"><svg xmlns="http://www.w3.org/2000/svg" class="ambulance-status--icon" fill="#1DD75B" id="Flat" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.12041,104.12041,0,0,1,232,128Z"></path></svg><p class="ambulance-status--text">Còn xe</p></div>`;
  const boxHospitalNavigate = document.createElement('div')
  boxHospitalNavigate.classList.add('hospital-info__navigate-direction')
  boxHospitalNavigate.innerHTML = `<button class="direct-google-map"><a target="_blank" href=${getAdress(locationlatLng, hos.location)}>Dẫn đường</a></button>`
  const btnCallAmbulance = document.createElement('button');
  btnCallAmbulance.classList.add("direct-search");
  btnCallAmbulance.innerHTML = "Gọi online";
  btnCallAmbulance.addEventListener('click', ()=>{
    modal.classList.add('open');
  })
  boxHospitalNavigate.appendChild(btnCallAmbulance)
  document.querySelector
  if(document.querySelector(".hospital-info") != null){
    document.querySelector(".hospital-info").remove();
  }
  boxHospital.appendChild(boxHospitalNavigate)
  document.querySelector(".tab-funtion-map--controls__navigate").appendChild(boxHospital);
  boxHospital.insertAdjacentElement("afterbegin", imgHospital);
  console.log(document.querySelector('.tab-funtion-map--controls__navigate-container.hospital-info').getAttribute("id_hospital"))
  document.querySelector(".hospital-info--img").addEventListener("load", hospitalInfo);
}

const distance = (coordinates1, coordinates2) =>{
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
    hos.distance = distance(locationlatLng, hos.coordinate);
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

export const loadingPage = async () =>{
  await getHospitalList("");
  document.querySelector('.load-page').remove();
  document.getElementsByTagName("body")[0].style.background = "none";
  document.getElementById('header').style.display = "block";
  document.getElementById('content').style.display = "flex";
}


findHosInput.addEventListener("input",()=>{
  getHospitalList(findHosInput.value)
});

export const addressInput = ()=>{
  slideLeft();
  getHospitalList("");
  if(document.querySelector(".tab-funtion-map--controls__navigate-container.hospital-info") != null){
      document.querySelector(".tab-funtion-map--controls__navigate-container.hospital-info").remove();
  }
  document.querySelector('.tab-funtion-map--controls__navigate-container.error').style.display = "flex";
  
}
const validateForm = async (e)=>{
  e.preventDefault();
  let info = document.querySelector('.tab-funtion-map--controls__navigate-container.hospital-info').getAttribute("id_hospital");
  if(info=="1842979c32e0.eb8e1b09ef8e6"){
    let value = document.querySelector('.input-phone-number').value
    document.querySelector('.modal').classList.remove('open');
    await callAmbulance(id_hospital, locationlatLng, value).then((key)=>{
      var now = new Date();
      now.setDate(now.getDate() + 1);
      document.cookie= `_hId=${id_hospital}; expires=${now.toUTCString()}; Path=/`;
      document.cookie= `_cId=${key}; expires=${now.toUTCString()}; Path=/`;
      window.location.href = "/ontheway";
      console.log('ontheway')
    });
  } else{
    alert("Tính năng gọi online tại bệnh viện này chưa khả dụng!")
  }

}
document.querySelector('.myForm').addEventListener("submit", validateForm);

listenAmount("1842979c32e0.eb8e1b09ef8e6", (amount)=>{
  if(amount==0){
    getHospitalList("", "Hết xe");
  }else{
    getHospitalList("");
  }
})

const getAdress = (latLng, hosLocation) =>{
  var value = document.querySelector('.map-search-location--input').value;
  if(value==""){
    return `https://www.google.com/maps/dir/${encodeURIComponent(latLng)}/${encodeURIComponent(hosLocation)}`
  } else{
    return `https://www.google.com/maps/dir/${encodeURIComponent(value)}/${encodeURIComponent(hosLocation)}`
  }
}

// `<div class="tab-funtion-map--controls__navigate-container hospital-info"> <img class="hospital-info--img" src="${hos.image}" alt=""> <h2 class="hospital-info--name">Bệnh viện quận 9</h2> <span class="hospital-info--location"><img class="hospital-info--location_icon" src="./assets/img/map-pin.svg" alt=""><p class="hospital-info--location_address">387 Lê Văn Việt, Phường Tăng Nhơn Phú A , Quận 9 , Hồ Chí Minh</p></span> <span class="hospital-info--phone"><img class="hospital-info--phone_icon" src="./assets/img/phone.svg" alt=""><p class="hospital-info--phone_number">0333159054</p></span> <span class="hospital-info--specialist"><img class="hospital-info--specialist_icon" src="./assets/img/first-aid.svg" alt=""><p class="hospital-info--specialist_name">Đa khoa</p></span> <div class="ambulance-status"><svg xmlns="http://www.w3.org/2000/svg" class="ambulance-status--icon" fill="#1DD75B" id="Flat" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.12041,104.12041,0,0,1,232,128Z"></path></svg><p class="ambulance-status--text">Còn xe</p></div> <div class="hospital-info__navigate-direction"> <button class="direct-google-map"><a target="_blank" href="https://www.google.com/maps/dir/%C4%90%C6%B0%E1%BB%9Dng+s%E1%BB%91+2+C%C6%B0+x%C3%A1+Ra%C4%91a,+ph%C6%B0%E1%BB%9Dng+13,+Qu%E1%BA%ADn+6,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/168+%C4%90.+Phan+V%C4%83n+Tr%E1%BB%8B,+Ph%C6%B0%E1%BB%9Dng+5,+G%C3%B2+V%E1%BA%A5p,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh/@10.825258,106.6884562,17z/data=!3m1!4b1!4m11!4m10!1m2!1m1!1s0x31752c2aaf50fac1:0x30d41b0d708fad00!1m5!1m1!1s0x317528f1bae90d1d:0xdc67a6bbc407fb0e!2m2!1d106.6906449!2d10.825258!3e0?hl=vi-VN">Dẫn đường</a></button> <button class="direct-search">Tìm kiếm</button> </div>`