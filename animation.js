const headerSearch = document.querySelector('.container-tab-funtion-map--header_search');
const headerNavigate = document.querySelector('.container-tab-funtion-map--header_navigate');

function slideRight(e) {
	headerSearch.classList.remove('active');
	headerNavigate.classList.add('active');
}

function slideLeft(e) {
	headerNavigate.classList.remove('active');
	headerSearch.classList.add('active');
}

headerSearch.addEventListener('click', slideLeft);
headerNavigate.addEventListener('click', slideRight);