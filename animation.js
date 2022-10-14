const headerSearch = document.querySelector('.container-tab-funtion-map--header_search');
const headerNavigate = document.querySelector('.container-tab-funtion-map--header_navigate');
const mapControlSearch = document.querySelector('.tab-funtion-map--controls');
const mapControlNavigate = document.querySelector('.tab-funtion-map--controls__navigate');
const directSearch = document.querySelector('.direct-search');
const mapSearchLocationContainer = document.querySelector('.map-search-location--icon-container');
const mapSearchLocationInput = document.getElementById("input-1");
const findHosInput = document.querySelector('.find-hos-input');
mapControlNavigate.style.display = "none";
headerSearch.classList.add('active');

function slideRight(e) {
	headerSearch.classList.remove('active');
	headerNavigate.classList.add('active');
	mapControlSearch.style.display = "none";
	mapControlNavigate.style.display = "block";
}

function slideLeft(e) {
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
directSearch.addEventListener('click', slideLeft)