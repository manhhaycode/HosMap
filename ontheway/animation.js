const headerSearch = document.querySelector('.container-tab-funtion-map--header_search');
const mapControlContainer = document.querySelector('.container-tab-function-map');
const mapControlSearch = document.querySelector('.tab-funtion-map--controls');
const mapControlNavigate = document.querySelector('.tab-funtion-map--controls__navigate');
const mapContainer = document.querySelector('.map-container');
mapControlNavigate.style.display = "none";
headerSearch.classList.add('active');
const openMap = document.querySelector('.open-map');
const btnHideSide = document.querySelector('.btn-hide-side-controls')
document.querySelector('.btn-close-1').addEventListener('click', ()=>{
	document.querySelector('.modal').classList.remove('open');
})

document.querySelector('.btn-close-2').addEventListener('click', ()=>{
	document.querySelector('.modal').classList.remove('open');
})

export function hospitalInfo(e) {
	mapControlNavigate.style.display = "block";
	headerSearch.classList.remove('active');
	headerNavigate.classList.add('active');
	mapControlSearch.style.display = "none";
	document.querySelector('.tab-funtion-map--controls__navigate-container.error').style.display = "none";
}

openMap.addEventListener('click', ()=>{
	mapControlContainer.style.display = "none";
	mapContainer.style.display ="block";
})
btnHideSide.addEventListener('click', ()=>{
	mapControlContainer.style.display = "block";
	mapContainer.style.display ="none";
})
