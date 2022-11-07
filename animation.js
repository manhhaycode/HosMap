const headerSearch = document.querySelector('.container-tab-funtion-map--header_search');
const headerNavigate = document.querySelector('.container-tab-funtion-map--header_navigate');
const mapControlContainer = document.querySelector('.container-tab-function-map');
const mapControlSearch = document.querySelector('.tab-funtion-map--controls');
const mapControlNavigate = document.querySelector('.tab-funtion-map--controls__navigate');
const directSearch = document.querySelector('.direct-search');
const mapContainer = document.querySelector('.map-container');
const mapSearchLocationContainer = document.querySelector('.map-search-location--icon-container');
const mapSearchLocationInput = document.getElementById("input-1");
mapControlNavigate.style.display = "none";
headerSearch.classList.add('active');
const imgLoadPage = document.createElement('img');
const openMap = document.querySelector('.open-map');
const btnHideSide = document.querySelector('.btn-hide-side-controls')

imgLoadPage.classList.add('img-load-page');
imgLoadPage.src = "./assets/img/Pageloading.png";
document.querySelector(".load-page").insertBefore(imgLoadPage, document.querySelector(".load-page").firstChild);
document.querySelector('.img-load-page').addEventListener('load',() =>{
	document.querySelector('.lds-ring').style.display = "block";
})
export function slideRight(e) {
	headerSearch.classList.remove('active');
	headerNavigate.classList.add('active');
	mapControlSearch.style.display = "none";
	mapControlNavigate.style.display = "block";
}

export function hospitalInfo(e) {
	mapControlNavigate.style.display = "block";
	headerSearch.classList.remove('active');
	headerNavigate.classList.add('active');
	mapControlSearch.style.display = "none";
	document.querySelector('.tab-funtion-map--controls__navigate-container.error').style.display = "none";
}

export function hospitalList(e){}

export function slideLeft(e) {
	headerNavigate.classList.remove('active');
	headerSearch.classList.add('active');
	mapControlSearch.style.display = "block";
	mapControlNavigate.style.display = "none";
}

mapSearchLocationContainer.addEventListener('click', function(e){
	mapSearchLocationInput.focus();
})
headerSearch.addEventListener('click', slideLeft);
headerNavigate.addEventListener('click', slideRight);
directSearch.addEventListener('click', slideLeft);
document.querySelector('.region-box').addEventListener('click', (e)=>{
	e.stopPropagation();
	document.querySelector('.search-region-box').style.display = "block";
})
document.getElementsByTagName('body')[0].addEventListener('click', (e)=>{
	e.stopPropagation();
	document.querySelector('.search-region-box').style.display = "none";
})
openMap.addEventListener('click', ()=>{
	mapControlContainer.style.display = "none";
	mapContainer.style.display ="block";
})
btnHideSide.addEventListener('click', ()=>{
	mapControlContainer.style.display = "block";
	mapContainer.style.display ="none";
})
